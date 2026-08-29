import os
import random
import requests
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AILead, WebhookLog
from .serializers import AILeadSerializer, WebhookLogSerializer
from fleet.models import Vehicle
from fleet.serializers import VehicleSerializer

def dispatch_webhook(event_type, title, payload, lead_score=None, lead_tier='High'):
    """Helper to dispatch and log webhooks with real HTTP post attempt if WEBHOOK_URL is set"""
    evt_id = f"evt-{random.randint(100, 999)}"
    webhook_url = os.environ.get('WEBHOOK_URL', '')
    http_status = '200 OK'

    if webhook_url:
        try:
            res = requests.post(webhook_url, json=payload, timeout=3)
            http_status = f"{res.status_code} {res.reason}"
        except Exception as e:
            http_status = 'Failed'

    return WebhookLog.objects.create(
        event_id=evt_id,
        event_type=event_type,
        title=title,
        lead_score=lead_score,
        lead_tier=lead_tier,
        status=http_status,
        payload=payload
    )


class WebhookLogViewSet(viewsets.ModelViewSet):
    queryset = WebhookLog.objects.all().order_by('-timestamp')
    serializer_class = WebhookLogSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'], url_path='trigger-test')
    def trigger_test(self, request):
        score = random.randint(80, 99)
        payload = {
            'event': 'test.webhook_ping',
            'triggeredBy': 'Super Admin',
            'environment': 'production',
            'latencyMs': random.randint(65, 180),
            'leadScore': score,
            'timestamp': os.environ.get('CURRENT_TIME', '2026-08-29T08:27:00Z'),
        }
        new_log = dispatch_webhook(
            event_type='webhook.dispatched',
            title='Test Webhook Payload Dispatched',
            payload=payload,
            lead_score=score,
            lead_tier='High'
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
        query = request.data.get('query', '').strip()
        query_lower = query.lower()
        vehicles = Vehicle.objects.all()

        # Check for external LLM API key if provided
        api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('OPENAI_API_KEY')
        if api_key and len(query) > 5:
            try:
                # Optional Gemini API call
                if os.environ.get('GEMINI_API_KEY'):
                    import json
                    headers = {'Content-Type': 'application/json'}
                    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                    prompt_text = f"You are BestCar AI Concierge. A customer asks: '{query}'. Provide a friendly 2-sentence recommendation for high-end vehicle rentals."
                    body = {"contents": [{"parts": [{"text": prompt_text}]}]}
                    r = requests.post(gemini_url, json=body, headers=headers, timeout=4)
                    if r.status_code == 200:
                        res_data = r.json()
                        ai_text = res_data['candidates'][0]['content']['parts'][0]['text']
                        matched = vehicles.filter(is_featured=True)[:2]
                        if not matched.exists():
                            matched = vehicles[:2]
                        return Response({
                            'response': ai_text,
                            'recommended_vehicles': VehicleSerializer(matched, many=True).data
                        }, status=status.HTTP_200_OK)
            except Exception as err:
                print("External LLM API call fallback to rule engine:", err)

        # High Performance AI Intelligence Rules Engine
        matched = []
        if 'family' in query_lower or 'suv' in query_lower or '7' in query_lower or 'spacious' in query_lower:
            matched = vehicles.filter(category__name__iexact='SUV')[:2]
            if not matched.exists():
                matched = vehicles.filter(seats__gte=5)[:2]
            text = "Great choice! Based on your family trip preferences, here are our spacious SUVs with ample luggage space and safety features:"

        elif 'luxury' in query_lower or 'premium' in query_lower or 'vip' in query_lower:
            matched = vehicles.filter(category__name__iexact='Luxury')[:2]
            if not matched.exists():
                matched = vehicles.filter(price_per_day__gte=200)[:2]
            text = "Here are our top premium luxury models engineered for supreme performance and ultimate comfort:"

        elif 'budget' in query_lower or 'cheap' in query_lower or '100' in query_lower or 'affordable' in query_lower:
            matched = vehicles.filter(price_per_day__lte=110)[:2]
            if not matched.exists():
                matched = vehicles.order_by('price_per_day')[:2]
            text = "Here are our best budget-friendly rental options that offer outstanding value under $100/day:"

        elif 'electric' in query_lower or 'ev' in query_lower or 'eco' in query_lower or 'hybrid' in query_lower:
            matched = vehicles.filter(fuel_type__in=['Electric', 'Hybrid'])[:2]
            if not matched.exists():
                matched = vehicles[:2]
            text = "Here are our zero-emission electric and eco-friendly hybrid models for smooth, silent travel:"

        elif 'manual' in query_lower:
            matched = vehicles.filter(transmission='Manual')[:2]
            text = "Here are our driver-focused manual transmission vehicles for complete performance control:"

        elif 'automatic' in query_lower:
            matched = vehicles.filter(transmission='Automatic')[:2]
            text = "Here are our smooth automatic transmission models perfect for city driving and long highway cruises:"

        else:
            matched = vehicles.filter(is_featured=True)[:2]
            if not matched.exists():
                matched = vehicles[:2]
            text = f"Based on your request '{query}', I highly recommend checking out these featured top-rated rentals:"

        serializer = VehicleSerializer(matched, many=True)
        return Response({
            'response': text,
            'recommended_vehicles': serializer.data
        }, status=status.HTTP_200_OK)

