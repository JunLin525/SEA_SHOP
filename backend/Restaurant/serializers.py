from .models import Restaurants, Comment
from rest_framework import serializers


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = "__all__"


class RestaurantCommentSerializer(serializers.ModelSerializer):
    RestaurantName = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_RestaurantName(self, obj):
        return obj.Restaurant.Name
