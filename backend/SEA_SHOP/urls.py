"""
URL configuration for SEA_SHOP project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import FacebookLogin
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import GoogleLogin
from .views import Home
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,  # new
)


class specialView(SpectacularAPIView, SpectacularSwaggerView):
    pass


urlpatterns = [
    # path('', Home.as_view(), name='home'),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(
        url_name="schema"), name="redoc",),
    path("", SpectacularSwaggerView.as_view(
        url_name="schema"), name="swagger-ui"),
    path('admin/', admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('dj-rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api-jwt/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-jwt/token/refresh/', TokenRefreshView.as_view()),
    path('Restaurant-api/', include('Restaurant.urls')),
    path('Settlement-api/', include('SouthEastAsiaCommunityAtTaiwan.urls')),
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)
