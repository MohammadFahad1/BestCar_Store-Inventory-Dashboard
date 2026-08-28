from rest_framework import serializers
from .models import AILead, WebhookLog

class AILeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = AILead
        fields = [
            'id',
            'customer_name',
            'customer_email',
            'vehicle_requested',
            'rental_days',
            'estimated_revenue',
            'lead_score',
            'lead_tier',
            'ai_score_reason',
            'created_at',
        ]


class WebhookLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebhookLog
        fields = [
            'id',
            'event_id',
            'event_type',
            'title',
            'lead_score',
            'lead_tier',
            'status',
            'payload',
            'timestamp',
        ]
