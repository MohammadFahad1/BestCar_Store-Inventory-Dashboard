from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalesByCountryViewSet, AnalyticsMetricViewSet, SalesChartAPIView

router = DefaultRouter()
router.register('sales-by-country', SalesByCountryViewSet, basename='sales-by-country')
router.register('kpis', AnalyticsMetricViewSet, basename='kpi')

urlpatterns = [
    path('sales-chart/', SalesChartAPIView.as_view(), name='sales-chart'),
    path('', include(router.urls)),
]
