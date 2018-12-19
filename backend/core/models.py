from django.db import models


class Apartment(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    street = models.CharField(max_length=64)
    city = models.CharField(max_length=32)
    postal_code = models.IntegerField()
    phone = models.IntegerField()
    pin_code = models.IntegerField()
    sensors = models.ManyToManyField('Sensor')

    def __str__(self):
        return f'{self.first_name}, {self.last_name} - {self.street} ({self.postal_code})'


class Sensor(models.Model):
    description = models.TextField(max_length=512)
    provides = models.ManyToManyField('SensorProvides')

    def __str__(self):
        return f'{self.description}'


class SensorProvides(models.Model):
    uri = models.CharField(max_length=255)
    description = models.CharField(max_length=128)

    def __str__(self):
        return f' {self.uri} ({self.description})'


class Service(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=512)
    eula_url = models.CharField(max_length=255)
    requires = models.ManyToManyField('ServiceRequirement')

    def __str__(self):
        return f'{self.name}'


class ServiceRequirement(models.Model):
    uri = models.CharField(max_length=255)
    description = models.CharField(max_length=128)

    def __str__(self):
        return f'Service requires {self.uri}'


class Subscription(models.Model):
    apartment = models.ForeignKey(Apartment, on_delete=models.DO_NOTHING)
    service = models.ForeignKey(Service, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.apartment} subscription of {self.service}'
