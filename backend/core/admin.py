from django.contrib import admin

from .models import (Apartment, Sensor, SensorAttribute, Service)

admin.site.register(Apartment)
admin.site.register(Sensor)
admin.site.register(Service)
admin.site.register(SensorAttribute)
