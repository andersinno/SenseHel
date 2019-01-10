from rest_framework import serializers

from ..models import Apartment, Service, Subscription, User, ApartmentSensor, ApartmentSensorValue


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'phone')
        read_only_fields = fields


class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = (
            'id',
            'name',
            'description',
            'price',
            'benefit_short',
            'benefit_long',
            'eula_url',
            'img_logo_url',
            'img_service_url',
        )
        read_only_fields = fields


class ApartmentSensorValueSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ApartmentSensorValue
        fields = ('id', 'value', 'updated_at')


class ApartmentSensorSerializer(serializers.HyperlinkedModelSerializer):
    # TODO: nesting resources ?
    # apartment_sensor_values = ApartmentSensorValueSerializer()

    class Meta:
        model = ApartmentSensor
        fields = ('id', 'apartment_sensor_values')


class ApartmentSerializer(serializers.HyperlinkedModelSerializer):
    # TODO: nesting resources ?
    # apartment_sensors = ApartmentSensorSerializer()

    class Meta:
        model = Apartment
        fields = ('id', 'street', 'city', 'postal_code', 'apartment_sensors')
        read_only_fields = fields


class SubscriptionSerializer(serializers.HyperlinkedModelSerializer):
    service = ServiceSerializer()

    class Meta:
        model = Subscription
        fields = ('id', 'created_at', 'updated_at', 'service')
