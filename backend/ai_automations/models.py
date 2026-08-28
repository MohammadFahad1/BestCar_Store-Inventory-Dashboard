from django.db import models

class AILead(models.Model):
    TIER_CHOICES = (
        ('High', 'High Lead Score'),
        ('Medium', 'Medium Lead Score'),
        ('Low', 'Low Lead Score'),
    )

    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    vehicle_requested = models.CharField(max_length=150)
    rental_days = models.IntegerField(default=1)
    estimated_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    lead_score = models.IntegerField(default=85)
    lead_tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='High')
    ai_score_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - Score: {self.lead_score} ({self.lead_tier})"


class WebhookLog(models.Model):
    EVENT_TYPE_CHOICES = (
        ('booking.created', 'booking.created'),
        ('lead.qualified', 'lead.qualified'),
        ('inventory.alert', 'inventory.alert'),
        ('webhook.dispatched', 'webhook.dispatched'),
    )

    STATUS_CHOICES = (
        ('200 OK', '200 OK'),
        ('Pending', 'Pending'),
        ('Queued', 'Queued'),
        ('Failed', 'Failed'),
    )

    event_id = models.CharField(max_length=50, unique=True)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    lead_score = models.IntegerField(null=True, blank=True)
    lead_tier = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='200 OK')
    payload = models.JSONField(default=dict)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.event_id} ({self.event_type}) - {self.status}"
