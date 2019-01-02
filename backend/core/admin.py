from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (Apartment, Sensor, SensorAttribute, Service, User)


class MyUserAdmin(UserAdmin):
    model = User

    fieldsets = UserAdmin.fieldsets + (
        ('Contact', {'fields': ('phone', )}),
    )


admin.site.register(Apartment)
admin.site.register(Sensor)
admin.site.register(Service)
admin.site.register(SensorAttribute)
admin.site.register(User, MyUserAdmin)
