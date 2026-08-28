from django.db import models

class SalesByCountry(models.Model):
    TIME_RANGE_CHOICES = (
        ('week', 'This Week'),
        ('month', 'This Month'),
        ('quarter', 'This Quarter'),
        ('year', 'This Year'),
    )

    country_code = models.CharField(max_length=10, help_text="ISO 3-letter code (e.g. USA, CHN, IDN)")
    country_name = models.CharField(max_length=100)
    sales_count = models.IntegerField(default=0)
    revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    time_range = models.CharField(max_length=20, choices=TIME_RANGE_CHOICES, default='week')
    color_tier = models.CharField(max_length=20, default='navy', help_text="'navy' or 'orange'")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Sales by Countries"
        unique_together = ('country_code', 'time_range')

    def __str__(self):
        return f"{self.country_name} ({self.country_code}) - {self.sales_count} sales [{self.time_range}]"


class AnalyticsMetric(models.Model):
    weekly_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=14890.00)
    weekly_earnings_growth = models.DecimalField(max_digits=5, decimal_places=2, default=12.5)
    total_sales_count = models.IntegerField(default=6547)
    total_sales_growth = models.DecimalField(max_digits=5, decimal_places=2, default=8.3)
    purchased_goods_count = models.IntegerField(default=1478)
    purchased_goods_growth = models.DecimalField(max_digits=5, decimal_places=2, default=-2.1)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"KPI Metrics (Earnings: ${self.weekly_earnings})"
