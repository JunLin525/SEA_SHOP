from django.urls import path
from .views import SetlementList, SettlementDetail
from .views import ReplyPostList, ReplyPostDetail
urlpatterns = [
    path("Detail/<uuid:pk>/", SettlementDetail.as_view(),
         name="Settlement_Detail"),
    path("List", SetlementList.as_view(), name="Settlement_List"),
    path("Reply-Detail/<uuid:pk>/", ReplyPostDetail.as_view(), name="Reply_Detail"),
    path("Reply-List", ReplyPostList.as_view(), name="Reply_List"),
]
