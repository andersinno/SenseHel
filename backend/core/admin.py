from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (Apartment, ApartmentSensor, ApartmentSensorValue, Sensor,
                     SensorAttribute, Service, Subscription, User)


class MyUserAdmin(UserAdmin):
    model = User

    fieldsets = UserAdmin.fieldsets + (('Contact', {'fields': ('phone',)}),)


class ApartmentSensorInline(admin.TabularInline):
    model = ApartmentSensor


class ApartmentAdmin(admin.ModelAdmin):
    inlines = [ApartmentSensorInline]


class ApartmentSensorValueAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'attribute', 'value', 'updated_at')


admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Sensor)
admin.site.register(
    ApartmentSensorValue, ApartmentSensorValueAdmin
)  # TODO: For testing
admin.site.register(Service)
admin.site.register(Subscription)
admin.site.register(SensorAttribute)
admin.site.register(User, MyUserAdmin)
