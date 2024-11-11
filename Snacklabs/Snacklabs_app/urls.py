from django.urls import path  # type: ignore
from Snacklabs_app.views import index, save_section, delete_section
from Snacklabs_app.views import session_list, session_new, session_detail
from Snacklabs_app.views import get_lyrics_index, get_lyrics_step, get_lyrics_complete
from django.conf import settings  # type: ignore
from django.conf.urls.static import static  # type: ignore


urlpatterns = [
    path("", index, name="index"),
    path("save_section/", save_section, name="save_section"),
    path("delete_section/<int:section_id>/", delete_section, name="delete_section"),
    path("sessions/", session_list, name="session_list"),
    path("sessions/new/", session_new, name="session_new"),
    path("sessions/<int:pk>/", session_detail, name="session_detail"),
    path("get_lyrics/", get_lyrics_index, name="get_lyrics_index"),
    path("get_lyrics/step<int:step>/", get_lyrics_step, name="get_lyrics_step"),
    path("get_lyrics/complete/", get_lyrics_complete, name="get_lyrics_complete"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
