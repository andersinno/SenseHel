from rest_framework import viewsets, generics

from ..models import Service, Apartment, SensorAttribute, Subscription
from .serializers import ServiceSerializer, ApartmentSerializer, SubscriptionSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    """
    Serialize Apartments current authenticated user belongs to.
    """
    serializer_class = ApartmentSerializer

    def get_queryset(self):
        return Apartment.objects.filter(user=self.request.user)


class ApartmentServiceList(generics.ListAPIView):
    """
    Serialize all services current authenticated user could
    subscribe to considering what sensors are available and what
    requirements services have.
    """
    serializer_class = ServiceSerializer

    def get_queryset(self):
        apartment = Apartment.objects.get(user=self.request.user)
        available_sensors = SensorAttribute.objects.filter(sensors__in=apartment.sensors.all())
        return Service.objects.filter(requires__in=available_sensors).distinct()


class SubscribedServiceList(generics.ListAPIView):
    """
    Serialize Services current authenticated user is subscribed to
    """
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.filter(subscription__user=self.request.user).distinct()


class SubscriptionList(generics.ListAPIView):
    """
    Serialize Subscriptions current authenticated has.
    SubscriptionSerializer inlines Service
    """
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)
