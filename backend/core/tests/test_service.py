from rest_framework.test import APITestCase

from core.models import SensorAttribute, Service, User


class ServiceTest(APITestCase):
    def setUp(self):
        User.objects.create_user(username="nkha", password="123456")

        SensorAttribute.objects.create(uri='test uri', description='test description')

    def test_service(self):
        # Without logged in user
        response = self.client.get('/api/services/')
        self.assertEqual(401, response.status_code)

        # With logged in user and no service
        self.client.login(username="nkha", password="123456")
        response = self.client.get('/api/services/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data), 0)
        # With logged in user and service
        Service.objects.create(
            name='test name', price=12, description='test description'
        )
        response = self.client.get('/api/services/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.data[0]['price'], '12')
        self.assertEqual(response.data[0]['description'], 'test description')
        self.assertEqual(response.data[0]['name'], 'test name')
