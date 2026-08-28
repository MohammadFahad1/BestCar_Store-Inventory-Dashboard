from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Wishlist

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'role', 'avatar']


class WishlistSerializer(serializers.ModelSerializer):
    vehicle_details = serializers.SerializerMethodField()

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'vehicle', 'vehicle_details', 'created_at']

    def get_vehicle_details(self, obj):
        return {
            'id': obj.vehicle.id,
            'name': obj.vehicle.name,
            'pricePerDay': float(obj.vehicle.price_per_day),
            'image': obj.vehicle.image_url,
        }
