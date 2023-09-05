from django.shortcuts import render
from rest_framework import generics
from .models import Restaurants, Comment
from .serializers import RestaurantSerializer, RestaurantCommentSerializer
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from .permissions import IsAuthorOrReadOnly  # new

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
        responses={200: RestaurantSerializer(many=True)},
       examples=[
        OpenApiExample(
            name="Successful Response",
            description="Sample response for the restaurants list endpoint.",
            value=[
                {
                    "id": 5,
                    "Name": "池先生Kopitiam | 士林店",
                    "Country": "馬來西亞",
                    "Price": 250,
                    "Rating": 8,
                    "People": 3,
                    "Address": "111031台北市士林區福華路150號",
                    "Introduction": "離捷運站很近，總是有滿滿的香味傳出，麵包咖哩或是椰香飯都讓人喜悅。\r\n超開心的一間聚餐餐廳。",
                    "Picture": "http://127.0.0.1:8000/media/Restaurant/Kopitam.jpg"
                },
                {
                    "id": 6,
                    "Name": "Chandu 讚都",
                    "Country": "印尼",
                    "Price": 200,
                    "Rating": 9,
                    "People": 2,
                    "Address": "106台北市大安區市民大道三段128巷6號1樓",
                    "Introduction": "風味跟特色極佳的印尼餐廳，位於光華商場後方，逛累了就來這邊吃，特色小吃讚到不行",
                    "Picture": "http://127.0.0.1:8000/media/Restaurant/Chandu.jpg"
                }
            ]
        )
    ]
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
        responses={200: RestaurantSerializer()},
        examples=[
            # code="200"
            OpenApiExample(
                name="Successful Response",
                description="""
                Sample response for the restaurant post .
                一個可以簡單用這個restaurant API做 post 行為的格式
                """,
                value= {
                        "Name": "三季Sanji",
                        "Country": "緬甸/Myanmar",
                        "Price": 580,
                        "Rating": 8, ## less than ten
                        "People": 8,
                        "Address": "235新北市中和區興南路二段22-1號",
                        "Introduction": "一個夭壽讚的餐廳啦~",
                        "Picture": "https://lh3.googleusercontent.com/p/AF1QipMEb5DjVHsSfO7OHNEn_WozwL_QwEiD_PZ40E28=s680-w680-h510"
                        }
                    
                
            )
        ]
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    ### get ###

    @extend_schema(
        description="""
        You can use this to get specific restaurant data
        可以透過這個API獲得特定一間的餐廳描述
        """,
        responses={200: RestaurantSerializer()},
        examples=[
            OpenApiExample(
                name="Sucessful Response",
                description="get verb in Restaurant-detail api, use this to get specific restaurant data.",
                value={
                    "id": 2,
                    "Name": "Sanji Teahouse 三季",
                    "Country": "緬甸",
                    "Price": 250,
                    "Rating": 8,
                    "People": 4,
                    "Address": "235新北市中和區興南路二段22-1號",
                    "Introduction": "烤餅甜點都超級讚，一個瘋狂讓人想吃東西的店面，裝飾擺設都很明亮，值得再訪。",
                    "Picture": "http://127.0.0.1:8000/media/Restaurant/%E4%B8%8B%E8%BC%89.jpg"
                }
            )
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    ##### put###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant data, but need to update whole data in the same time/
        可以透過這個API變更特定一間的餐廳描述，但每次變更資料時都要上傳全部的欄位。
        """,
        responses={200: RestaurantSerializer()},
        examples=[
            OpenApiExample(
                name="Successful Response",
                description="Put verb in Restaurant-detail api,u se this to edit the data.Don't forget to fill in all the form don't miss anything or this verb will be fail.",
                 value={
                    "id": 2,
                    "Name": "Sanji Teahouse 三季",
                    "Country": "緬甸",
                    "Price": 5000,
                    "Rating": 1,
                    "People": 50,
                    "Address": "235新北市中和區興南路二段22-1號",
                    "Introduction": "烤餅甜點都超~~~~~超~~~~超~~~~級讚，一個瘋狂讓人想吃東西的店面，裝飾擺設都很明亮，值得再訪。",
                    "Picture": "http://127.0.0.1:8000/media/Restaurant/%E4%B8%8B%E8%BC%89.jpg"
                }
            )
            
        ]
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    ### patch ###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant data, can submit any single data each time/
        可以透過這個API變更特定一間的餐廳描述，每次上傳只要傳送一個欄位即可。
        """,
        responses={200: RestaurantSerializer()},
        examples=[
            OpenApiExample(
                name="Successful Response",
                description="Patch verb in Restaurant-detail api, use this to edit specific restaurant detail data.",
                value={
                    "id": 2,
                    "Name": "Sanji Teahouse 三季",
                    "Country": "緬甸",
                    "Price": 5000,
                    # "Rating": 8,
                    # "People": 4,
                    # "Address": "235新北市中和區興南路二段22-1號",
                    # "Introduction": "烤餅甜點都超級讚，一個瘋狂讓人想吃東西的店面，裝飾擺設都很明亮，值得再訪。",
                    # "Picture": "http://127.0.0.1:8000/media/Restaurant/%E4%B8%8B%E8%BC%89.jpg"
                }
            )
        ]
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    ### delete ###
    @extend_schema(
        description="""
        You can use this to delete specific restaurant data,be careful and make sure the data you want to delete before you call this api./
        可以透過這個API刪除一間餐廳的資料，因為是刪除請確認好你要刪除這筆資料再來使用這個刪除功能。
        """,
        responses={200: RestaurantSerializer()},
        examples=[
            OpenApiExample(
                name="Successful Response",
                description="Delete verb in Restaurant-detail api. make sure you want delete the data before you use this verb.",
                value={
                    "id": 2,
                    "Name": "Sanji Teahouse 三季",
                    "Country": "緬甸",
                    "Price": 5000,
                    "Rating": 8,
                    "People": 4,
                    "Address": "235新北市中和區興南路二段22-1號",
                    "Introduction": "烤餅甜點都超級讚，一個瘋狂讓人想吃東西的店面，裝飾擺設都很明亮，值得再訪。",
                    "Picture": "http://127.0.0.1:8000/media/Restaurant/%E4%B8%8B%E8%BC%89.jpg"
                }
            )
        ]
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
        responses={200: RestaurantCommentSerializer(many=True)},
          examples=[
        OpenApiExample(
            name="Successful Response",
            description="Sample response for the restaurants list endpoint.",
            value=[
                    {
                    "id": 1,
                    "RestaurantName": "Sanji Teahouse 三季",
                    "Rating": 8,
                    "Title": "超好吃的啦!",
                    "Body": "第一次嘗試就覺得快瘋掉了~",
                    "user_pk": 5,
                    "Restaurant": 2
                    },
                    {
                    "id": 6,
                    "RestaurantName": "Chandu 讚都",
                    "Rating": 10,
                    "Title": "讚都好好吃啊",
                    "Body": "台北必吃的印尼小吃",
                    "user_pk": 2,
                    "Restaurant": 6
                    },
                    {
                    "id": 4,
                    "RestaurantName": "阿鸞手工法國麵包",
                    "Rating": 2,
                    "Title": "超讚",
                    "Body": "超讚",
                    "user_pk": 6,
                    "Restaurant": 12
                    },
            ]
        )
    ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class CommentRestaurantDetail(generics.RetrieveUpdateDestroyAPIView,
                              generics.CreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)  # new
    queryset = Comment.objects.all()
    serializer_class = RestaurantCommentSerializer

 



### post ###

    @extend_schema(
        description="""
        You can use this to post comment of any restaurant 
        可以透過這個API去張貼對任何一間的餐廳評論
        """,
        responses={200: RestaurantCommentSerializer()},
                   examples=[
                       OpenApiExample(
                        name="Successful Response",
                        description="""
                        Sample response for the restaurant comment post verb .
                        一個可以簡單用這個restaurant comment API做 post 行為的格式，藉此對特定餐廳提出評分跟評論。
                        """,
                         value={
                            "id": 4,
                            "RestaurantName": "阿鸞手工法國麵包",
                            "Rating": 2,
                            "Title": "超讚好吃手工麵包",
                            "Body": "超讚，根本這一生中沒吃過這樣好吃的東西，彷彿要神蹟降臨。",
                            "user_pk": 6,
                            "Restaurant": 12
                        },
                           
                       )
                   ] 
    )



    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    ### get ###

    @extend_schema(
        description="""
        You can use this to get specific restaurant comment data
        可以透過這個API獲得特定一則的餐廳評論
        """,
        responses={200: RestaurantCommentSerializer()},
         examples=[
                       OpenApiExample(
                        name="Successful Response",
                        description="""
                        Sample response for the restaurant comment get verb  .
                        一個可以簡單用這個restaurant comment API做get行為的格式，藉此取得特定餐廳留言的評分跟評論。
                        """,
                         value={
                            "id": 4,
                            "RestaurantName": "阿鸞手工法國麵包",
                            "Rating": 2,
                            "Title": "超讚好吃手工麵包",
                            "Body": "超讚，根本這一生中沒吃過這樣好吃的東西，彷彿要神蹟降臨。",
                            "user_pk": 6,
                            "Restaurant": 12
                        },
                           
                       )
                   ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    ##### put###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant comment data, but need to update whole data in the same time/
        可以透過這個API變更特定一的餐廳評論描述，但每次變更資料時都要上傳全部的欄位，不能擇一上傳。
        """,
        responses={200: RestaurantCommentSerializer()},
         examples=[
                       OpenApiExample(
                        name="Successful Response",
                        description="""
                        Sample response for the restaurant comment Put verb  .
                        一個可以簡單用這個restaurant comment API做put行為的格式，藉此更新修正特定餐廳留言的評分跟評論，但記得要填寫所有欄位才能順利更新。
                        """,
                         value={
                            "id": 4,
                            "RestaurantName": "阿鸞手工法國麵包",
                            "Rating": 8,
                            "Title": "超讚的啦好吃手工麵包",
                            "Body": "根本超讚(打完再打一次) 超讚，根本這一生中沒吃過這樣好吃的東西，彷彿要神蹟降臨。",
                            "user_pk": 6,
                            "Restaurant": 12
                        },
                           
                       )
                   ]
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    ### patch ###
    @extend_schema(
        description="""
        You can use this to edit specific restaurant comment data, can submit any single data each time/
        可以透過這個API變更特定一則的餐廳評論描述，每次上傳只要傳送一個欄位即可。
        """,
        responses={200: RestaurantCommentSerializer()},
         examples=[
                       OpenApiExample(
                        name="Successful Response",
                        description="""
                        Sample response for the restaurant comment Patch verb  .
                        一個可以簡單用這個restaurant comment API做Patch行為的格式，藉此更新特定餐廳留言的評分跟評論。可以填入任意的一個欄位就送出，就可以更新。
                        """,
                         value={
                            "id": 4,
                            "RestaurantName": "阿鸞手工法國麵包",
                            "Body": "超讚的啦，根本這一生中沒吃過這樣好吃的東西，彷彿要神蹟降臨。 就算要更新貼文還是要留言",
                            "user_pk": 6,
                            "Restaurant": 12
                        },
                           
                       )
                   ]
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    ### delete ###
    @extend_schema(
        description="""
        You can use this to delete specific restaurant comment data,be careful and make sure the data you want to delete before you call this api./
        可以透過這個API刪除一則餐廳評論的資料，因為是刪除請確認好你要刪除這筆資料再來使用這個刪除功能。
        """,
        responses={200: RestaurantCommentSerializer()},
         examples=[
                       OpenApiExample(
                        name="Successful Response",
                        description="""
                        Sample response for the restaurant comment Delete verb  . Make sure you want to delete the data before you use this verb
                        一個可以簡單用這個restaurant comment API做delete行為的格式，請確定你真的要刪除檔案再進行動作。
                        """,
                         value={
                            "id": 4,
                            "RestaurantName": "阿鸞手工法國麵包",
                            "Rating": 2,
                            "Title": "超讚好吃手工麵包",
                            "Body": "超讚，根本這一生中沒吃過這樣好吃的東西，彷彿要神蹟降臨。",
                            "user_pk": 6,
                            "Restaurant": 12
                        },
                           
                       )
                   ]
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
