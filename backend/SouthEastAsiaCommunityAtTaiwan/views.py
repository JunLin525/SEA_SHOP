from rest_framework.pagination import PageNumberPagination
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework import generics
from .models import Settlement, Reply
from .serializers import SettlementSerializer, ReplySerializer
from .permissions import IsAuthorOrReadOnly  # new

# Create your views here.


class SetlementList(generics.ListAPIView):
    queryset = Settlement.objects.all()
    serializer_class = SettlementSerializer


class SettlementDetail(generics.RetrieveUpdateDestroyAPIView,
                       generics.CreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,) 
    queryset = Settlement.objects.all()
    serializer_class = SettlementSerializer


# class AreaPostListPrice(viewsets.ModelViewSet):
# queryset = Area.objects.all()
# serializer_class = AreaSerializer
# filter_backends = [filters.SearchFilter]
# filterset_fields = ["Name", "Address", "Country", "Introduction"]


class ReplyPostList(generics.ListAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class ReplyPostDetail(generics.RetrieveUpdateDestroyAPIView,
                      generics.CreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,) 
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
