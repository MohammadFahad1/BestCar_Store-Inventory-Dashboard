from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Vehicle, VehicleImage
from .serializers import CategorySerializer, VehicleSerializer, VehicleImageSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all().order_by('-created_at')
    serializer_class = VehicleSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand', 'location', 'category__name']
    ordering_fields = ['price_per_day', 'created_at', 'sales_count', 'rating']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        fuel_type = self.request.query_params.get('fuel_type')
        transmission = self.request.query_params.get('transmission')
        max_price = self.request.query_params.get('max_price')
        is_featured = self.request.query_params.get('is_featured')

        if category:
            queryset = queryset.filter(category__name__iexact=category)
        if fuel_type:
            queryset = queryset.filter(fuel_type__iexact=fuel_type)
        if transmission:
            queryset = queryset.filter(transmission__iexact=transmission)
        if max_price:
            try:
                queryset = queryset.filter(price_per_day__lte=float(max_price))
            except ValueError:
                pass
        if is_featured:
            queryset = queryset.filter(is_featured=True)

        return queryset
