from rest_framework import serializers
from .models import Booking, Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id',
            'transaction_code',
            'booking',
            'payment_method',
            'amount',
            'status',
            'time_ago',
            'created_at',
        ]


class BookingSerializer(serializers.ModelSerializer):
    vehicle_name = serializers.CharField(source='vehicle.name', read_only=True)
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id',
            'booking_reference',
            'user',
            'customer_name',
            'customer_email',
            'customer_phone',
            'vehicle',
            'vehicle_name',
            'pickup_location',
            'return_location',
            'pickup_date',
            'return_date',
            'total_days',
            'total_price',
            'status',
            'transactions',
            'created_at',
        ]
