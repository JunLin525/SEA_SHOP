from django.shortcuts import render
from rest_framework import generics
from .models import Restaurants, Comment
from .serializers import RestaurantSerializer, RestaurantCommentSerializer
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

class RestaurantFilter(filters.FilterSet):
    max_price = filters.NumberFilter(field_name="Price", lookup_expr='lte')
    max_people = filters.NumberFilter(field_name="People", lookup_expr='gte')
    max_rating = filters.NumberFilter(field_name="Rating", lookup_expr='gte')
    Introduction_contains = filters.CharFilter(
        field_name="Introduction", lookup_expr='icontains')


class RestaurantList(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantSerializer
    filterset_class = RestaurantFilter

    @extend_schema(
        description="""
        You can use this API to get whole restaurant data inside database/
        你將可以使用此API來獲取資料庫中的全部餐廳列表。
        """,
        responses={200: RestaurantSerializer(many=True)}

    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView,
                       generics.CreateAPIView):
    queryset = Restaurants.objects.all()

    serializer_class = RestaurantSerializer

    ### post ###
    @extend_schema(
        description="""
        You can use this to post specific restaurant data
        可以透過這個API去張貼一間的餐廳描述
        """,
        responses={200: RestaurantSerializer()}
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    ### get ###

    @extend_schema(
        description="""
        You can use this to get specific restaurant data
        可以透過這個API獲得特定一間的餐廳描述
        """,
        responses={200: RestaurantSerializer()}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    ##### put###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant data, but need to update whole data in the same time/
        可以透過這個API變更特定一間的餐廳描述，但每次變更資料時都要上傳全部的欄位。
        """,
        responses={200: RestaurantSerializer()}
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    ### patch ###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant data, can submit any single data each time/
        可以透過這個API變更特定一間的餐廳描述，每次上傳只要傳送一個欄位即可。
        """,
        responses={200: RestaurantSerializer()}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    ### delete ###
    @extend_schema(
        description="""
        You can use this to delete specific restaurant data,be careful and make sure the data you want to delete before you call this api./
        可以透過這個API刪除一間餐廳的資料，因為是刪除請確認好你要刪除這筆資料再來使用這個刪除功能。
        """,
        responses={200: RestaurantSerializer()}
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


class CommentRestaurantList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = RestaurantCommentSerializer

    @extend_schema(
        description="""
        You can use this API to get whole restaurant comment data inside database/
        你將可以使用此API來獲取資料庫中的全部的餐廳評論列表。
        """,
        responses={200: RestaurantSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class CommentRestaurantDetail(generics.RetrieveUpdateDestroyAPIView,
                              generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = RestaurantCommentSerializer


### post ###

    @extend_schema(
        description="""
        You can use this to post comment of any restaurant 
        可以透過這個API去張貼對任何一間的餐廳評論
        """,
        responses={200: RestaurantSerializer(many=True)
                   },


    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    ### get ###

    @extend_schema(
        description="""
        You can use this to get specific restaurant comment data
        可以透過這個API獲得特定一則的餐廳評論
        """,
        responses={200: RestaurantSerializer()}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    ##### put###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant comment data, but need to update whole data in the same time/
        可以透過這個API變更特定一的餐廳評論描述，但每次變更資料時都要上傳全部的欄位，不能擇一上傳。
        """,
        responses={200: RestaurantSerializer()}
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    ### patch ###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant comment data, can submit any single data each time/
        可以透過這個API變更特定一則的餐廳評論描述，每次上傳只要傳送一個欄位即可。
        """,
        responses={200: RestaurantSerializer()}
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    ### delete ###
    @extend_schema(
        description="""
        You can use this to delete specific restaurant comment data,be careful and make sure the data you want to delete before you call this api./
        可以透過這個API刪除一則餐廳評論的資料，因為是刪除請確認好你要刪除這筆資料再來使用這個刪除功能。
        """,
        responses={200: RestaurantSerializer()}
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
