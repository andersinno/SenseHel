from rest_framework import viewsets, generics

from ..models import Service, Apartment, SensorAttribute, Sensor, Subscription
from .serializers import ServiceSerializer, ApartmentSerializer, SubscriptionSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer


class ApartmentServiceList(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        apartment = Apartment.objects.get(user=self.request.user)
        available_sensors = SensorAttribute.objects.filter(sensors__in=apartment.sensors.all())
        return Service.objects.filter(requires__in=available_sensors).distinct()


class SubscriptionList(generics.ListAPIView):
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        apartment = Apartment.objects.get(user=self.request.user)
        return Subscription.objects.filter(apartment=apartment)
