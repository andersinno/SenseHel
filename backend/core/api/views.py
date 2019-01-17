from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Apartment, Service, Subscription, ApartmentSensor, ApartmentSensorValue, Sensor
from . import serializers


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = serializers.ServiceSerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    """
    Serialize Apartments current authenticated user belongs to.
    """
    serializer_class = serializers.ApartmentSerializer

    def get_queryset(self):
        return Apartment.objects.filter(user=self.request.user)


class ApartmentSensorViewSet(viewsets.ModelViewSet):
    queryset = ApartmentSensor.objects.all()  # TODO: require user has access for this resource
    serializer_class = serializers.ApartmentSensorSerializer


class ApartmentSensorValueViewSet(viewsets.ModelViewSet):
    queryset = ApartmentSensorValue.objects.all()  # TODO: require user has access for this resource
    serializer_class = serializers.ApartmentSensorValueSerializer


class ApartmentServiceList(generics.ListAPIView):
    """
    Serialize all services current authenticated user could
    subscribe to considering what sensors are available and what
    requirements services have.
    """
    serializer_class = serializers.ServiceSerializer

    def get_queryset(self):
        apartment = Apartment.objects.get(user=self.request.user)
        available_attributes = []
        for sensor in [apartment_sensor.sensor for apartment_sensor in apartment.apartment_sensors.all()]:
            available_attributes.extend(sensor.provides.all())
        return Service.objects.filter(requires__in=available_attributes).distinct()


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = serializers.SensorSerializer


class SubscriptionViewSet(
    viewsets.mixins.ListModelMixin,
    viewsets.mixins.CreateModelMixin,
    viewsets.mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    Serialize all subscriptions and provide methods to create new
    subscriptions and terminate old ones.
    """
    serializer_class = serializers.SubscriptionSerializer

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


@api_view(['POST'])
def update_sensor_by_identifier(request):
    """
    Example payload::

        {
            "sensor": 1,
            "identifier": "ABCDEFGH",
            "attributes": [
                {
                    "id": 1,
                    "value": 20
                },
                {
                    "id": 2,
                    "value": 30
                }

            ]
        }
    """
    # TODO: handle lookup failures
    apsen = ApartmentSensor.objects.get(
        sensor__id=request.data['sensor'],
        identifier=request.data['identifier'])

    for attr in request.data['attributes']:
        apsenval = apsen.apartment_sensor_values.get(attribute__id=attr['id'])  # type: ApartmentSensorValue
        apsenval.value = attr['value']
        apsenval.save()

    return Response({"message": "Updated"})
