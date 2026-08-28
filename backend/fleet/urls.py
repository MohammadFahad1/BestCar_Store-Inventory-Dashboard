from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, VehicleViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('vehicles', VehicleViewSet, basename='vehicle')

urlpatterns = [
    path('', include(router.urls)),
]
