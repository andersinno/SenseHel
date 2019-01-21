from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import serializers
from .. import models


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    """
    Serialize Apartments current authenticated user belongs to.
    """

    serializer_class = serializers.ApartmentSerializer

    def get_queryset(self):
        return models.Apartment.objects.filter(user=self.request.user)


class ApartmentSensorViewSet(viewsets.ModelViewSet):
    queryset = (
        models.ApartmentSensor.objects.all()
    )  # TODO: require user has access for this resource
    serializer_class = serializers.ApartmentSensorSerializer


class ApartmentSensorValueViewSet(viewsets.ModelViewSet):
    queryset = (
        models.ApartmentSensorValue.objects.all()
    )  # TODO: require user has access for this resource
    serializer_class = serializers.ApartmentSensorValueSerializer


class ApartmentServiceList(generics.ListAPIView):
    """
    Serialize all services current authenticated user could
    subscribe to considering what sensors are available and what
    requirements services have.
    """

    serializer_class = serializers.ServiceSerializer

    def get_queryset(self):
        apartment = models.Apartment.objects.get(user=self.request.user)
        available_attributes = []
        for sensor in [
            apartment_sensor.sensor
            for apartment_sensor in apartment.apartment_sensors.all()
        ]:
            available_attributes.extend(sensor.provides.all())
        return models.Service.objects.filter(
            requires__in=available_attributes
        ).distinct()


class SensorViewSet(viewsets.ModelViewSet):
    queryset = models.Sensor.objects.all()
    serializer_class = serializers.SensorSerializer


class SensorAttributeViewSet(viewsets.ModelViewSet):
    queryset = models.SensorAttribute.objects.all()
    serializer_class = serializers.SensorAttributeSerializer


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
        return models.Subscription.objects.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        # TODO: using serializers would be the right way ..

        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)

        # headers = self.get_success_headers(serializer.data)
        # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        service_id = int(request.data['service'])
        if models.Subscription.objects.filter(
            user=self.request.user, service_id=service_id
        ).exists():
            return Response(
                {"detail": "Subscription for this service exists"},
                status=status.HTTP_409_CONFLICT,
            )

        models.Subscription.objects.create(
            user=self.request.user, service_id=service_id
        )
        return Response({}, status=status.HTTP_201_CREATED)


# TODO: authentication?
@api_view(['POST'])
def update_sensor_by_identifier(request):
    """
    Example payload::

        {
            "identifier": "ABCDEFGH",
            "attributes": [
                {
                    "URI": "http://finto.fi/afo/en/page/p4770",
                    "value": 200
                },
                {
                    "URI": "http://urn.fi/URN:NBN:fi:au:ucum:r73",
                    "value": 21
                }

            ]
        }
    """
    try:
        apsen = models.ApartmentSensor.objects.get(
            identifier=request.data['identifier']
        )

        for attr in request.data['attributes']:
            apsenval = apsen.apartment_sensor_values.get(
                attribute__uri=attr['URI']
            )  # type: ApartmentSensorValue
            apsenval.value = attr['value']
            apsenval.save()

        return Response({"message": "Updated successfully"})
    except models.ApartmentSensor.DoesNotExist:
        return Response(
            {"message": "ApartmentSensor does not exists with given identifier"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except models.ApartmentSensorValue.DoesNotExist:
        return Response(
            {"message": "ApartmentSensorValue does not exists with given URI"},
            status=status.HTTP_404_NOT_FOUND,
        )


# TODO: authentication?
@api_view(['POST'])
def digita_gw(request):
    pass
