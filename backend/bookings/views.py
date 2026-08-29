import random
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Booking, Transaction
from .serializers import BookingSerializer, TransactionSerializer
from ai_automations.models import AILead
from ai_automations.views import dispatch_webhook

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        ref_code = f"BK-2026-{random.randint(100, 999)}"
        booking = serializer.save(booking_reference=ref_code)
        
        # Create corresponding initial transaction record
        trx_code = f"TRX-{random.randint(100000, 999999)}"
        Transaction.objects.create(
            transaction_code=trx_code,
            booking=booking,
            payment_method='PayU',
            amount=booking.total_price,
            status='Success',
            time_ago='Just now'
        )

        # Update Vehicle sales count
        if booking.vehicle:
            booking.vehicle.sales_count += 1
            booking.vehicle.save()

        # Dynamically update SalesByCountry metrics in database
        from dashboard_analytics.models import SalesByCountry
        sbc = SalesByCountry.objects.filter(country_code='USA', time_range='week').first()
        if sbc:
            sbc.sales_count += 1
            sbc.revenue = float(sbc.revenue) + float(booking.total_price)
            sbc.save()

        # Automated AI Lead Qualification
        lead_score = min(99, max(60, int(booking.total_price / 10) + booking.total_days * 5))
        lead_tier = 'High' if lead_score >= 85 else ('Medium' if lead_score >= 70 else 'Low')
        
        AILead.objects.create(
            customer_name=booking.customer_name or 'Walk-in Customer',
            customer_email=booking.customer_email or 'customer@bestcar.com',
            vehicle_requested=booking.vehicle.name if booking.vehicle else 'Luxury Fleet',
            rental_days=booking.total_days,
            estimated_revenue=booking.total_price,
            lead_score=lead_score,
            lead_tier=lead_tier,
            ai_score_reason=f"High-intent booking created for {booking.total_days} days."
        )

        # Automated Webhook Payload Dispatch & Logging
        dispatch_webhook(
            event_type='booking.created',
            title=f"New Booking {ref_code} Confirmed",
            payload={
                'event': 'booking.created',
                'bookingReference': ref_code,
                'customerName': booking.customer_name,
                'vehicle': booking.vehicle.name if booking.vehicle else 'Luxury Vehicle',
                'totalPrice': float(booking.total_price),
                'leadScore': lead_score,
                'status': 'Confirmed',
            },
            lead_score=lead_score,
            lead_tier=lead_tier
        )


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-created_at')
    serializer_class = TransactionSerializer
    permission_classes = [permissions.AllowAny]
