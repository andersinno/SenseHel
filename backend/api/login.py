from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView


class PinCodeValidator:

    def __init__(self, length=6):
        self.length = length

    def validate(self, password, user=None):
        if not password.isdigit():
            raise ValidationError(_("Pincode has to be in 6-digits format"), code='pincode_not_numeric')
        if len(password) is not self.length:
            raise ValidationError(
                _("The pincode must contain %(length)d digit(s), 0-9."),
                code='pincode_length',
                params={'length': self.length},
            )

    def get_help_text(self):
        return _(
            "Your pincode must contain exactly %(length)d digit(s), 0-9." % {'length': self.length}
        )

class LoginTokenAPIView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'},
                            status=HTTP_400_BAD_REQUEST)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key},
                        status=HTTP_200_OK)
