from rest_framework import serializers
from .models import Settlement, Reply


class SettlementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settlement
        fields = "__all__"


class ReplySerializer(serializers.ModelSerializer):
    AreaName=serializers.SerializerMethodField()
    UserName=serializers.SerializerMethodField()

    class Meta:
        model = Reply
        fields = "__all__"
    def get_AreaName(self, obj):
        return obj.Area.AreaName
    def get_UserName(self, obj):
        return obj.user_pk.username