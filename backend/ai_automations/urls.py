from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WebhookLogViewSet, AILeadViewSet, AiConciergeAPIView

router = DefaultRouter()
router.register('logs', WebhookLogViewSet, basename='webhook-log')
router.register('leads', AILeadViewSet, basename='ai-lead')

urlpatterns = [
    path('ai-concierge/', AiConciergeAPIView.as_view(), name='ai-concierge'),
    path('', include(router.urls)),
]
