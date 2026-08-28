from rest_framework import serializers
from .models import Category, Vehicle, VehicleImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description']


class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = ['id', 'image', 'caption']


class VehicleSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    gallery = VehicleImageSerializer(many=True, read_only=True, source='gallery_images')

    class Meta:
        model = Vehicle
        fields = [
            'id',
            'name',
            'brand',
            'category',
            'category_name',
            'model_year',
            'price_per_day',
            'seats',
            'transmission',
            'fuel_type',
            'mileage_limit',
            'location',
            'rating',
            'reviews_count',
            'image_url',
            'image_file',
            'sales_count',
            'status',
            'is_featured',
            'gallery',
            'created_at',
        ]
