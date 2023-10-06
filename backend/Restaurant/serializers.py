from .models import Restaurants, Comment
from rest_framework import serializers


class RestaurantSerializer(serializers.ModelSerializer):
    userName=serializers.SerializerMethodField()

    class Meta:
        model = Restaurants
        fields = "__all__"
    def get_userName(self,obj):
        return obj.user_pk.username


class RestaurantCommentSerializer(serializers.ModelSerializer):
    RestaurantName = serializers.SerializerMethodField()
    userName=serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = "__all__"

    def get_RestaurantName(self, obj):
        return obj.Restaurant.Name
    def get_userName(self,obj):
        return obj.user_pk.username

