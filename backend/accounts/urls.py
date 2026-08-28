from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterAPIView, UserProfileAPIView, WishlistViewSet

router = DefaultRouter()
router.register('wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('profile/', UserProfileAPIView.as_view(), name='profile'),
    path('', include(router.urls)),
]
