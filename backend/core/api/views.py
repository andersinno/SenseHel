from rest_framework import generics, viewsets, status
from rest_framework.response import Response

from ..models import Apartment, SensorAttribute, Service, Subscription
from .serializers import (ApartmentSerializer, ServiceSerializer,
                          SubscriptionSerializer)


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
        available_sensors = SensorAttribute.objects.filter(
            sensors__in=apartment.sensors.all()
        )
        return Service.objects.filter(requires__in=available_sensors).distinct()


class SubscriptionViewSet(
    viewsets.mixins.ListModelMixin,
    viewsets.mixins.CreateModelMixin,
    viewsets.mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):

    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        # TODO: using serializers would be the right way ..

        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)

        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        service_id = int(request.data['service'])
        if Subscription.objects.filter(user=self.request.user, service_id=service_id).exists():
            return Response({"detail": "Subscription for this service exists"},
                            status=status.HTTP_409_CONFLICT)

        Subscription.objects.create(user=self.request.user, service_id=service_id)
        return Response({}, status=status.HTTP_201_CREATED)
