from django.urls import reverse
from rest_framework.test import APITestCase

from core.models import User


class LoginTest(APITestCase):
    url = reverse('login')

    def setUp(self):
        User.objects.create_user(username="nkha", password="123456")

    def test_login_success(self):
        data = {'username': 'nkha', 'password': '123456'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(200, response.status_code)
        self.assertNotEqual(response.data['token'], '')

    def test_login_fail(self):
        data = {'username': 'invalid', 'password': '123456'}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(400, response.status_code)
        self.assertNotEqual(response.data['error'], '')
