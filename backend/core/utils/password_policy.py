from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class PinCodeValidator:
    def __init__(self, length=6):
        self.length = length

    def validate(self, password, user=None):
        if not password.isdigit():
            raise ValidationError(
                _("Pincode has to be in 6-digits format"), code='pincode_not_numeric'
            )
        if len(password) is not self.length:
            raise ValidationError(
                _("The pincode must contain %(length)d digit(s), 0-9."),
                code='pincode_length',
                params={'length': self.length},
            )

    def get_help_text(self):
        return _(
            "Your pincode must contain exactly %(length)d digit(s), 0-9."
            % {'length': self.length}
        )
