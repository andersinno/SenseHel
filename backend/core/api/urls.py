from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'service', views.ServiceViewSet)
router.register(r'apartment', views.ApartmentViewSet)

urlpatterns = router.urls
