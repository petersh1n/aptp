from django.urls import path
from . import views
from .views import LyricsView

urlpatterns = [
    path('', views.index, name='index'),  # 인덱스 뷰를 루트 URL에 매핑
    path('sessions/', views.session_list, name='session_list'),  # 세션 리스트
    path('sessions/new/', views.session_new, name='session_new'),  # 새 세션 생성
    #path('sessions/<int:pk>/edit/', views.session_edit, name='session_edit'),  # 세션 수정
    path('sessions/<int:pk>/', views.session_detail, name='session_detail'),  # 세션 상세보기
    path('lyrics/', LyricsView.as_view(), name='lyrics_search'),
    path('lyrics/edit/<str:song_title>/', LyricsView.as_view(), name='lyrics_edit'),
]