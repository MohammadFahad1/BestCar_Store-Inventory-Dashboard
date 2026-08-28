from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Wishlist
from .serializers import UserSerializer, WishlistSerializer

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Wishlist.objects.all()
        vehicle = self.request.query_params.get('vehicle')
        user_id = self.request.query_params.get('user_id')
        if vehicle:
            queryset = queryset.filter(vehicle_id=vehicle)
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset
