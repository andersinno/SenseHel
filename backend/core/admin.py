from django.contrib import admin

from .models import (Apartment, Sensor, SensorProvides, Service,
                     ServiceRequirement)

admin.site.register(Apartment)
admin.site.register(Sensor)
admin.site.register(Service)
admin.site.register(ServiceRequirement)
admin.site.register(SensorProvides)
