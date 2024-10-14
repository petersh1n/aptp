from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),  # Django 관리자 페이지
    path('', include('Snacklabs_app.urls')),  # Snacklabs 앱의 URL 포함
]