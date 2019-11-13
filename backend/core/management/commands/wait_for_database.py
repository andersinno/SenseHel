import time

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.utils import OperationalError


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("Waiting for the database to come up...")
        user_model = get_user_model()
        while True:
            try:
                user_model.objects.all()[:1].count()
            except OperationalError:
                time.sleep(0.1)
                continue
            break
        self.stdout.write("The database is up now.")
