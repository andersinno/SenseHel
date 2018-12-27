from rest_framework import serializers

from ..models import Service, Apartment


class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = ('name', 'description', 'eula_url')


class ApartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Apartment
        fields = ('first_name', 'last_name', 'street', 'city', 'postal_code', 'phone')
