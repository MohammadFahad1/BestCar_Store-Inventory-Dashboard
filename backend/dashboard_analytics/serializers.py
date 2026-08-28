from rest_framework import serializers
from .models import SalesByCountry, AnalyticsMetric

class SalesByCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesByCountry
        fields = [
            'id',
            'country_code',
            'country_name',
            'sales_count',
            'revenue',
            'time_range',
            'color_tier',
            'updated_at',
        ]


class AnalyticsMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsMetric
        fields = [
            'id',
            'weekly_earnings',
            'weekly_earnings_growth',
            'total_sales_count',
            'total_sales_growth',
            'purchased_goods_count',
            'purchased_goods_growth',
            'updated_at',
        ]
