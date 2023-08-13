from django.urls import path
from .views import RestaurantList, RestaurantDetail
from .views import CommentRestaurantDetail, CommentRestaurantList

urlpatterns = [
    path('Restaurant-List', RestaurantList.as_view(), name="Restaurant-List"),
    path('Restaurant-Detail/<int:pk>/',
         RestaurantDetail.as_view(), name='Restaurant_Detail'),
    path('Restaurant-Comment-List',
         CommentRestaurantList.as_view(), name='Comment-Restaurant'),
    path('Restaurant-Comment-Detail/<int:pk>/',
         CommentRestaurantDetail.as_view(), name='Comment-Restaurant-Detail'),

]
