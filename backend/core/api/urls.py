from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'services', views.ServiceViewSet)

urlpatterns = router.urls
