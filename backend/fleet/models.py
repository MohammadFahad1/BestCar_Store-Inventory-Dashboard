from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Lucide icon name (e.g. Car, Shield, Sparkles)")
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    TRANSMISSION_CHOICES = (
        ('Automatic', 'Automatic'),
        ('Manual', 'Manual'),
    )

    FUEL_CHOICES = (
        ('Petrol', 'Petrol'),
        ('Diesel', 'Diesel'),
        ('Electric', 'Electric'),
        ('Hybrid', 'Hybrid'),
    )

    STATUS_CHOICES = (
        ('Available', 'Available'),
        ('Rented', 'Rented'),
        ('Maintenance', 'In Maintenance'),
        ('Reserved', 'Reserved'),
    )

    name = models.CharField(max_length=150)
    brand = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='vehicles')
    model_year = models.IntegerField(default=2026)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    seats = models.IntegerField(default=5)
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES, default='Automatic')
    fuel_type = models.CharField(max_length=20, choices=FUEL_CHOICES, default='Petrol')
    mileage_limit = models.CharField(max_length=50, default='Unlimited')
    location = models.CharField(max_length=150, default='London Heathrow')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.90)
    reviews_count = models.IntegerField(default=120)
    image_url = models.CharField(max_length=500, blank=True, default='/cars/range_rover.jpg')
    image_file = models.ImageField(upload_to='vehicles/', blank=True, null=True)
    sales_count = models.IntegerField(default=0, help_text="Total successful rentals count")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (${self.price_per_day}/day)"


class VehicleImage(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='vehicles/gallery/')
    caption = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return f"Photo for {self.vehicle.name}"
