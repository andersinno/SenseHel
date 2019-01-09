from rest_framework import viewsets, generics, mixins

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



# class SubscriptionList(generics.ListAPIView,
#                        generics.DestroyAPIView):
#     """
#     Serialize Subscriptions current authenticated has.
#     SubscriptionSerializer inlines Service
#     """
#     serializer_class = SubscriptionSerializer
#
#     def get_queryset(self):
#         return Subscription.objects.filter(user=self.request.user)
#
#     def delete(self, request, *args, **kwargs):
#         import IPython; IPython.embed()
#         print("DESTROY CALLED " * 20)
#         return super().delete(request, *args, **kwargs)


class SubscriptionViewSet(viewsets.mixins.ListModelMixin,
                          viewsets.mixins.CreateModelMixin,
                          viewsets.mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):

    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        print("DESTROY CALLED " * 20)
        return super().destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

