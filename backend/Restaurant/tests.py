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
            Rating=5,
            Title='Test Comment',
            Body='This is a test comment',
            user_pk=self.user,
            Restaurant=self.restaurant,
        )

    def test_restaurant_list(self):
        url = reverse('Restaurant-List')
        response = self.client.get(url)
        # print(response.data)
        restaurants = Restaurants.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_restaurant_detail(self):
        url = reverse('Restaurant_Detail', kwargs={'pk': self.restaurant.pk})
        response = self.client.get(url)
       # print(response.data)
        restaurant = Restaurants.objects.get(pk=self.restaurant.id)
        serializer = RestaurantSerializer(restaurant)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_restaurant(self):
        updated_data = {
            'Name': 'Updated Restaurant Name',
            'Country': 'Updated Country',
            'Price': 150,
            'Rating': 4,
            'People': 10,
            'Address': 'update adress',
            'Introduction': 'update introduction'
        }
        url = reverse('Restaurant_Detail', kwargs={'pk': self.restaurant.pk})
        response = self.client.put(url, data=updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_restaurant = Restaurants.objects.get(pk=self.restaurant.id)
        self.assertEqual(updated_restaurant.Name, updated_data['Name'])
        self.assertEqual(updated_restaurant.Country, updated_data['Country'])
        self.assertEqual(updated_restaurant.Price, updated_data['Price'])
        self.assertEqual(updated_restaurant.Rating, updated_data['Rating'])
        self.assertEqual(updated_restaurant.People, updated_data['People'])
        self.assertEqual(updated_restaurant.Address, updated_data['Address'])
        self.assertEqual(updated_restaurant.Introduction.strip(),
                         updated_data['Introduction'].strip())

    def test_delete_restaurant(self):
        url = reverse('Restaurant_Detail', kwargs={'pk': self.restaurant.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(Restaurants.DoesNotExist):
            deleted_restaurant = Restaurants.objects.get(pk=self.restaurant.pk)

    def test_comment_list(self):
        url = reverse('Comment-Restaurant')
        response = self.client.get(url)
        # print(response.data)
        comment = Comment.objects.all()
        serializer = RestaurantCommentSerializer(comment, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_comment_detail(self):
        url = reverse('Comment-Restaurant-Detail',
                      kwargs={'pk': self.comment.id})
        response = self.client.get(url)
        # print(response.data)
        comment = Comment.objects.get(pk=self.restaurant.id)
        serializer = RestaurantCommentSerializer(comment)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_comment(self):
        updated_data = {
            'Rating': 4,
            'Title': 'update title',
            'Body': 'update body',
            'user_pk': self.user.pk,
            'Restaurant': self.restaurant.pk
        }
        url = reverse('Comment-Restaurant-Detail',
                      kwargs={'pk': self.comment.id})
        response = self.client.put(url, data=updated_data)
        # print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        comment = Comment.objects.get(pk=self.comment.id)

        self.assertEqual(comment.Rating, updated_data['Rating'])
        self.assertEqual(comment.Title.strip(), updated_data['Title'].strip())
        self.assertEqual(comment.Body.strip(), updated_data['Body'].strip())
    #    self.assertEqual(comment.user_pk, updated_data['user_pk'])

    def test_delete_comment(self):
        url = reverse('Comment-Restaurant-Detail',
                      kwargs={'pk': self.restaurant.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(Comment.DoesNotExist):
            deleted_comment = Comment.objects.get(pk=self.comment.id)
