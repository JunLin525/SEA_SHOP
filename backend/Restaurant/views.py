from django.shortcuts import render
from rest_framework import generics
from .models import Restaurants, Comment
from .serializers import RestaurantSerializer, RestaurantCommentSerializer
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
# Create your views here.


class RestaurantFilter(filters.FilterSet):
    max_price = filters.NumberFilter(field_name="Price", lookup_expr='lte')
    max_people = filters.NumberFilter(field_name="People", lookup_expr='lte')
    max_rating = filters.NumberFilter(field_name="Rating", lookup_expr='lte')


class RestaurantList(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer
    filterset_class = RestaurantFilter


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer


class CommentRestaurantList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = RestaurantCommentSerializer


class CommentRestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = RestaurantCommentSerializer
