from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet, TransactionViewSet

router = DefaultRouter()
router.register('rentals', BookingViewSet, basename='booking')
router.register('transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
]
