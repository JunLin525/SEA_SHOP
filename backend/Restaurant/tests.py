from .serializers import RestaurantSerializer, RestaurantCommentSerializer
from Custom_User.models import CustomUser
from .models import Restaurants, Comment
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from django.urls import reverse
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken


def create_access_token(user):
    token = AccessToken.for_user(user)
    return token


class APITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = CustomUser.objects.create_user(
            username='testuser', password='testpassword'
        )
        self.token = create_access_token(self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + str(self.token))
        print(self.token)
        self.restaurant = Restaurants.objects.create(
            Name='Test Restaurant',
            Country='Test Country',
            Price=100,
            Rating=5,
            People=4,
            Address='Test Address',
            Introduction=' Test Intrduction'
        )

        self.comment = Comment.objects.create(
            user_pk=self.user,
            Restaurant=self.restaurant,
            Rating=5,
            Title='Test Comment',
            Body='This is a test comment'
        )

    def test_restaurant_list(self):
        url = reverse('Restaurant-List')
        response = self.client.get(url)
        print(response.data)
        restaurants = Restaurants.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_restaurant_detail(self):
        url = reverse('Restaurant_Detail', kwargs={'pk': self.restaurant.pk})
        response = self.client.get(url)
        print(response.data)
        restaurant = Restaurants.objects.get(pk=self.restaurant.id)
        serializer = RestaurantSerializer(restaurant)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    # def test_comment_list(self):
    #     url = reverse('Comment-Restaurant')
    #     response = self.client.get(url)
    #     serializer = RestaurantCommentSerializer(Comment, many=True)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data, serializer.data)

    # def test_comment_detail(self):
    #     url = reverse('Comment-Restaurant-Detail',
    #                   kwargs={'pk': self.comment.id})
    #     response = self.client.get(url)
    #     comment = Comment.objects.get(pk=self.comment.id)
    #     serializer = RestaurantCommentSerializer(Comment)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data, serializer.data)
