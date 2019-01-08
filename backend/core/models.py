from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    From AbstractUser relevant fields

    username
    first_name
    last_name
    email

    See baseclass for full details
    """
    phone = models.IntegerField(null=True)
    invite_code = models.CharField(max_length=64)

    # Ask non null field values during createsuperuser
    REQUIRED_FIELDS = AbstractUser.REQUIRED_FIELDS + ['phone']


class Apartment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=64)
    city = models.CharField(max_length=32)
    postal_code = models.IntegerField()
    sensors = models.ManyToManyField('Sensor')

    def __str__(self):
        return f'{self.user.first_name}, {self.user.last_name} - {self.street} ({self.postal_code})'


class Sensor(models.Model):
    description = models.TextField(max_length=512)
    provides = models.ManyToManyField('SensorAttribute', related_name='sensors')

    def __str__(self):
        return f'{self.description}'


class SensorAttribute(models.Model):
    uri = models.CharField(max_length=255)
    description = models.CharField(max_length=128)

    def __str__(self):
        return f' {self.uri} ({self.description})'

    class Meta:
        verbose_name_plural = "Sensor Attributes"


class Service(models.Model):
    name = models.CharField(max_length=32)
    price = models.CharField(max_length=8)
    benefit_short = models.CharField(max_length=20)
    benefit_long = models.CharField(max_length=255)
    description = models.TextField(max_length=512)
    eula_url = models.CharField(max_length=255)
    img_logo_url = models.CharField(max_length=255, null=True)
    img_service_url = models.CharField(max_length=255, null=True)
    requires = models.ManyToManyField('SensorAttribute', related_name='services')

    def __str__(self):
        return f'{self.name}'


class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user} subscription of {self.service}'
