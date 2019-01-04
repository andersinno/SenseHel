from rest_framework import serializers

from ..models import Service, Apartment, Subscription


class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name', 'description', 'price', 'benefit_short', 'benefit_long', 'eula_url')


class ApartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Apartment
        fields = ('first_name', 'last_name', 'street', 'city', 'postal_code', 'phone')


class SubscriptionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subscription
        fields = ('id', 'created_at', 'updated_at', 'service', 'apartment')
