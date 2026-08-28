from django.db import models
from django.conf import settings

class Booking(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    )

    booking_reference = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='bookings'
    )
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=30, blank=True)
    vehicle = models.ForeignKey('fleet.Vehicle', on_delete=models.CASCADE, related_name='bookings')
    pickup_location = models.CharField(max_length=150)
    return_location = models.CharField(max_length=150)
    pickup_date = models.DateTimeField()
    return_date = models.DateTimeField()
    total_days = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.booking_reference} - {self.customer_name} ({self.vehicle.name})"


class Transaction(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ('Credit Card', 'Credit Card'),
        ('PayU', 'PayU'),
        ('PayPal', 'PayPal'),
        ('POS Terminal', 'POS Terminal'),
    )

    STATUS_CHOICES = (
        ('Success', 'Success'),
        ('Pending', 'Pending'),
        ('Cancelled', 'Cancelled'),
    )

    transaction_code = models.CharField(max_length=100, unique=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='transactions')
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, default='PayU')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Success')
    time_ago = models.CharField(max_length=50, default='Just now')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_code} - ${self.amount} ({self.status})"
