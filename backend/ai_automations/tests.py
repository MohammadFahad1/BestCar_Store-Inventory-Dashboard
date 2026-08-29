from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from fleet.models import Category, Vehicle
from ai_automations.models import WebhookLog, AILead
from bookings.models import Booking

class AIAutomationsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='SUV', slug='suv')
        self.vehicle = Vehicle.objects.create(
            name='Range Rover Sport',
            brand='Range Rover',
            category=self.category,
            price_per_day=250.00,
            seats=5,
            transmission='Automatic',
            fuel_type='Petrol',
            status='Available'
        )

    def test_ai_concierge_query_family(self):
        res = self.client.post('/api/automations/ai-concierge/', {'query': 'Looking for a family SUV'}, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('response', res.data)
        self.assertIn('recommended_vehicles', res.data)
        self.assertTrue(len(res.data['recommended_vehicles']) > 0)

    def test_webhook_trigger_test(self):
        res = self.client.post('/api/automations/logs/trigger-test/', format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(WebhookLog.objects.count(), 1)
        self.assertEqual(WebhookLog.objects.first().event_type, 'webhook.dispatched')

    def test_booking_creation_triggers_lead_scoring_and_webhook(self):
        payload = {
            'vehicle': self.vehicle.id,
            'customer_name': 'Test Lead Customer',
            'customer_email': 'testlead@example.com',
            'pickup_location': 'London Heathrow',
            'return_location': 'London Heathrow',
            'pickup_date': '2026-09-01T10:00:00Z',
            'return_date': '2026-09-05T10:00:00Z',
            'total_days': 4,
            'total_price': 1000.00,
            'status': 'Active'
        }
        res = self.client.post('/api/bookings/rentals/', payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AILead.objects.count(), 1)
        self.assertEqual(WebhookLog.objects.count(), 1)

