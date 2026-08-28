import random
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AILead, WebhookLog
from .serializers import AILeadSerializer, WebhookLogSerializer
from fleet.models import Vehicle
from fleet.serializers import VehicleSerializer

class WebhookLogViewSet(viewsets.ModelViewSet):
    queryset = WebhookLog.objects.all().order_by('-timestamp')
    serializer_class = WebhookLogSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'], url_path='trigger-test')
    def trigger_test(self, request):
        evt_id = f"evt-{random.randint(100, 999)}"
        new_log = WebhookLog.objects.create(
            event_id=evt_id,
            event_type='webhook.dispatched',
            title='Test Webhook Payload Dispatched',
            lead_score=random.randint(75, 99),
            lead_tier='High',
            status='200 OK',
            payload={
                'event': 'test.webhook_ping',
                'triggeredBy': 'Super Admin',
                'environment': 'production',
                'latencyMs': random.randint(80, 220),
            }
        )
        serializer = self.get_serializer(new_log)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AILeadViewSet(viewsets.ModelViewSet):
    queryset = AILead.objects.all().order_by('-created_at')
    serializer_class = AILeadSerializer
    permission_classes = [permissions.AllowAny]


class AiConciergeAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        query = request.data.get('query', '').lower()
        vehicles = Vehicle.objects.all()

        if 'family' in query or 'suv' in query or '7' in query:
            matched = vehicles.filter(category__name__iexact='SUV')[:2]
            text = "Great! Here are our top spacious SUV options perfect for family trips & luggage:"
        elif 'luxury' in query or 'premium' in query:
            matched = vehicles.filter(category__name__iexact='Luxury')[:2]
            text = "Here are our premium luxury models with top-tier performance:"
        elif 'budget' in query or 'cheap' in query or '100' in query:
            matched = vehicles.filter(price_per_day__lte=95)[:2]
            text = "Here are our best budget-friendly rental options under $100/day:"
        elif 'electric' in query or 'ev' in query:
            matched = vehicles.filter(fuel_type__iexact='Electric')[:2]
            text = "Here are our eco-friendly electric & hybrid models:"
        else:
            matched = vehicles[:2]
            text = f"Based on your request '{query}', I highly recommend checking out these featured rentals:"

        serializer = VehicleSerializer(matched, many=True)
        return Response({
            'response': text,
            'recommended_vehicles': serializer.data
        }, status=status.HTTP_200_OK)
