import os
import django
import random
from datetime import datetime, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'best_car.settings')
django.setup()

from accounts.models import User, Wishlist
from fleet.models import Category, Vehicle
from bookings.models import Booking, Transaction
from dashboard_analytics.models import SalesByCountry, AnalyticsMetric
from ai_automations.models import AILead, WebhookLog

def seed_database():
    print("Seeding BestCar database...")

    # 0. Default Users
    demo_user, _ = User.objects.get_or_create(
        id=1,
        username='demo_customer',
        defaults={
            'email': 'customer@bestcar.com',
            'first_name': 'Mike',
            'last_name': 'Witzel',
            'role': 'customer',
        }
    )

    # 1. Categories
    categories_data = [
        {'name': 'Popular', 'slug': 'popular', 'icon': 'Sparkles', 'description': 'Top requested rental vehicles'},
        {'name': 'Large Car', 'slug': 'large-car', 'icon': 'Car', 'description': 'Spacious SUVs & Vans'},
        {'name': 'Small Car', 'slug': 'small-car', 'icon': 'Shield', 'description': 'Compact city & eco cars'},
        {'name': 'Exclusive', 'slug': 'exclusive', 'icon': 'Zap', 'description': 'Luxury & High performance sports cars'},
        {'name': 'SUV', 'slug': 'suv', 'icon': 'Car', 'description': 'Family 7-seater & Offroad SUVs'},
        {'name': 'Luxury', 'slug': 'luxury', 'icon': 'Zap', 'description': 'Executive premium sedans'},
    ]

    cat_map = {}
    for c_data in categories_data:
        cat, _ = Category.objects.get_or_create(slug=c_data['slug'], defaults=c_data)
        cat_map[c_data['slug']] = cat

    # 2. Vehicles
    vehicles_data = [
        {
            'name': 'Range Rover Sport',
            'brand': 'Land Rover',
            'category': cat_map['suv'],
            'price_per_day': 260.00,
            'seats': 7,
            'transmission': 'Automatic',
            'fuel_type': 'Petrol',
            'mileage_limit': 'Unlimited',
            'location': 'London Heathrow',
            'rating': 4.95,
            'reviews_count': 184,
            'image_url': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
            'sales_count': 6547,
            'is_featured': True,
        },
        {
            'name': 'Audi S3 Sedan',
            'brand': 'Audi',
            'category': cat_map['exclusive'],
            'price_per_day': 1474.00,
            'seats': 5,
            'transmission': 'Automatic',
            'fuel_type': 'Petrol',
            'mileage_limit': '300 km/day',
            'location': 'London Central',
            'rating': 4.88,
            'reviews_count': 92,
            'image_url': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
            'sales_count': 3474,
            'is_featured': True,
        },
        {
            'name': 'Blue Nissan GT-R',
            'brand': 'Nissan',
            'category': cat_map['exclusive'],
            'price_per_day': 8784.00,
            'seats': 4,
            'transmission': 'Automatic',
            'fuel_type': 'Petrol',
            'mileage_limit': '250 km/day',
            'location': 'London City Airport',
            'rating': 4.98,
            'reviews_count': 310,
            'image_url': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
            'sales_count': 1478,
            'is_featured': True,
        },
        {
            'name': 'Toyota Corolla Hybrid',
            'brand': 'Toyota',
            'category': cat_map['small-car'],
            'price_per_day': 78.00,
            'seats': 5,
            'transmission': 'Automatic',
            'fuel_type': 'Hybrid',
            'mileage_limit': 'Unlimited',
            'location': 'London Gatwick',
            'rating': 4.75,
            'reviews_count': 420,
            'image_url': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
            'sales_count': 987,
            'is_featured': True,
        },
        {
            'name': 'Compact Mini Cooper',
            'brand': 'Mini',
            'category': cat_map['small-car'],
            'price_per_day': 65.00,
            'seats': 4,
            'transmission': 'Automatic',
            'fuel_type': 'Petrol',
            'mileage_limit': 'Unlimited',
            'location': 'London Central',
            'rating': 4.80,
            'reviews_count': 156,
            'image_url': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
            'sales_count': 784,
            'is_featured': True,
        },
        {
            'name': 'Tesla Model 3 Long Range',
            'brand': 'Tesla',
            'category': cat_map['popular'],
            'price_per_day': 120.00,
            'seats': 5,
            'transmission': 'Automatic',
            'fuel_type': 'Electric',
            'mileage_limit': 'Unlimited',
            'location': 'London Heathrow',
            'rating': 4.92,
            'reviews_count': 230,
            'image_url': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
            'sales_count': 1250,
            'is_featured': True,
        },
    ]

    vehicles_list = []
    for v_data in vehicles_data:
        v, _ = Vehicle.objects.get_or_create(name=v_data['name'], defaults=v_data)
        vehicles_list.append(v)

    # 3. Bookings & Transactions
    sample_customers = [
        ('BK-2026-894', 'Range Rover Sport', 'Credit Card', 'TRX-948123', 1569.00, 'Success', '2 hours ago'),
        ('BK-2026-895', 'Audi S3 Sedan', 'PayU', 'TRX-948124', 1474.00, 'Success', '5 hours ago'),
        ('BK-2026-896', 'Tesla Model 3 Long Range', 'PayPal', 'TRX-948125', 360.00, 'Pending', '1 day ago'),
        ('BK-2026-897', 'Toyota Corolla Hybrid', 'POS Terminal', 'TRX-948126', 234.00, 'Success', '2 days ago'),
        ('BK-2026-898', 'Blue Nissan GT-R', 'Credit Card', 'TRX-948127', 8784.00, 'Cancelled', '3 days ago'),
    ]

    for ref, v_name, pay_method, trx_code, amt, status_val, ago in sample_customers:
        v = Vehicle.objects.filter(name=v_name).first() or vehicles_list[0]
        b, _ = Booking.objects.get_or_create(
            booking_reference=ref,
            defaults={
                'customer_name': 'Mike Witzel',
                'customer_email': 'mike.witzel@example.com',
                'vehicle': v,
                'pickup_location': 'London Heathrow',
                'return_location': 'London Heathrow',
                'pickup_date': datetime.now(),
                'return_date': datetime.now() + timedelta(days=3),
                'total_days': 3,
                'total_price': amt,
                'status': 'Completed' if status_val == 'Success' else status_val,
            }
        )
        Transaction.objects.get_or_create(
            transaction_code=trx_code,
            defaults={
                'booking': b,
                'payment_method': pay_method,
                'amount': amt,
                'status': status_val,
                'time_ago': ago,
            }
        )

    # 4. Sales by Countries across time ranges
    country_data_by_range = {
        'week': [
            ('USA', 'United States', 6547, 85400.00, 'navy'),
            ('CHN', 'China', 3474, 45200.00, 'navy'),
            ('IDN', 'Indonesia', 1478, 18900.00, 'navy'),
            ('COD', 'DR Congo', 987, 12400.00, 'navy'),
            ('AGO', 'Angola', 784, 9800.00, 'navy'),
            ('BRA', 'Brazil', 1250, 15600.00, 'orange'),
        ],
        'month': [
            ('USA', 'United States', 24500, 320000.00, 'navy'),
            ('CHN', 'China', 14200, 185000.00, 'navy'),
            ('IDN', 'Indonesia', 6800, 89000.00, 'navy'),
            ('COD', 'DR Congo', 4200, 54000.00, 'navy'),
            ('AGO', 'Angola', 3100, 41000.00, 'navy'),
            ('BRA', 'Brazil', 5400, 68000.00, 'orange'),
        ],
        'quarter': [
            ('USA', 'United States', 78000, 1020000.00, 'navy'),
            ('CHN', 'China', 42000, 550000.00, 'navy'),
            ('IDN', 'Indonesia', 21000, 275000.00, 'navy'),
            ('COD', 'DR Congo', 12500, 160000.00, 'navy'),
            ('AGO', 'Angola', 9400, 122000.00, 'navy'),
            ('BRA', 'Brazil', 16500, 215000.00, 'orange'),
        ],
        'year': [
            ('USA', 'United States', 310000, 4100000.00, 'navy'),
            ('CHN', 'China', 168000, 2200000.00, 'navy'),
            ('IDN', 'Indonesia', 84000, 1100000.00, 'navy'),
            ('COD', 'DR Congo', 49000, 640000.00, 'navy'),
            ('AGO', 'Angola', 37000, 480000.00, 'navy'),
            ('BRA', 'Brazil', 64000, 840000.00, 'orange'),
        ],
    }

    for trange, countries in country_data_by_range.items():
        for code, cname, scount, rev, ctier in countries:
            SalesByCountry.objects.get_or_create(
                country_code=code,
                time_range=trange,
                defaults={
                    'country_name': cname,
                    'sales_count': scount,
                    'revenue': rev,
                    'color_tier': ctier,
                }
            )

    # 5. Analytics KPI Metric
    AnalyticsMetric.objects.get_or_create(
        id=1,
        defaults={
            'weekly_earnings': 14890.00,
            'weekly_earnings_growth': 12.5,
            'total_sales_count': 6547,
            'total_sales_growth': 8.3,
            'purchased_goods_count': 1478,
            'purchased_goods_growth': -2.1,
        }
    )

    # 6. Webhook Logs
    WebhookLog.objects.get_or_create(
        event_id='evt-101',
        defaults={
            'event_type': 'lead.qualified',
            'title': 'AI Lead Qualification: High Value Lead',
            'lead_score': 94,
            'lead_tier': 'High',
            'status': '200 OK',
            'payload': {
                'customer': 'Sarah Connor',
                'email': 'sarah.c@example.com',
                'vehicleRequested': 'Range Rover Sport',
                'rentalDays': 7,
                'estimatedRevenue': 1478.0,
                'aiScoreReason': 'Long term luxury rental request with verified identity.',
            }
        }
    )

    WebhookLog.objects.get_or_create(
        event_id='evt-102',
        defaults={
            'event_type': 'booking.created',
            'title': 'Automated Booking Sync -> CRM Webhook',
            'lead_score': 88,
            'lead_tier': 'High',
            'status': '200 OK',
            'payload': {
                'bookingId': 'BK-2026-894',
                'vehicleId': 'car-3',
                'vehicleName': 'Toyota Corolla',
                'paymentMethod': 'PayU',
                'totalPaid': 1569.0,
                'webhookUrl': 'https://api.bestcar.com/webhooks/booking-sync',
            }
        }
    )

    print("BestCar Database Seeded Successfully!")

if __name__ == '__main__':
    seed_database()
