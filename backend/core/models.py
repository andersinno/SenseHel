from django.db import models


class Apartment(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    city = models.CharField(max_length=32)
    street = models.CharField(max_length=64)
    postal_code = models.IntegerField()
    phone = models.IntegerField()
    pin_code = models.IntegerField()
    sensors = models.ManyToManyField('Sensor')


class Sensor(models.Model):
    description = models.TextField(max_length=512)
    provides = models.ManyToManyField('SensorProvides')


class SensorProvides(models.Model):
    uri = models.CharField(max_length=255)


class Service(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=512)
    eula_url = models.CharField(max_length=255)


class ServiceRequirement(models.Model):
    uri = models.CharField(max_length=255)


class Subscription(models.Model):
    apartment = models.ForeignKey(Apartment, on_delete=models.DO_NOTHING)
    service = models.ForeignKey(Service, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
