import random
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Booking, Transaction
from .serializers import BookingSerializer, TransactionSerializer

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


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-created_at')
    serializer_class = TransactionSerializer
    permission_classes = [permissions.AllowAny]
