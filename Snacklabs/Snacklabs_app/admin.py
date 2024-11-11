from django.contrib import admin
from .models import Lyrics

class LyricsAdmin(admin.ModelAdmin):
    list_display = ('song_title', 'artist_name')
    search_fields = ('song_title', 'artist_name')
    fields = ('song_title', 'artist_name', 'lyrics_text')  # 가사 내용을 수정할 수 있도록 추가

admin.site.register(Lyrics, LyricsAdmin)