from django.views import View
from django.shortcuts import render, get_object_or_404, redirect
from .models import Session  # Session 모델이 정의되어 있다고 가정합니다.
from .forms import SessionForm
from .forms import LyricsForm
from .lyrics.get_lyrics import getLyrics
import json
import os

def index(request):
    return render(request, 'index.html')

# 세션 목록을 보여주는 뷰
def session_list(request):
    sessions = Session.objects.all()  # 모든 세션을 가져옵니다.
    return render(request, 'session_list.html', {'sessions': sessions})


def session_new(request):
    if request.method == "POST":
        form = SessionForm(request.POST)
        if form.is_valid():
            session = form.save()
            return redirect('session_detail', pk=session.pk)  # 세션 상세보기로 리다이렉트
    else:
        form = SessionForm()
    return render(request, 'session_form.html', {'form': form})


# 세션 세부 정보를 보여주는 뷰
def session_detail(request, pk):
    session = get_object_or_404(Session, pk=pk)  # 주어진 pk에 해당하는 세션을 가져옵니다.
    return render(request, 'session_detail.html', {'session': session})


class LyricsView(View):
    def get(self, request):
        form = LyricsForm()
        return render(request, 'lyrics_search.html', {'form': form})

    def post(self, request):
        form = LyricsForm(request.POST)
        if form.is_valid():
            song_title = form.cleaned_data['song_title']
            artist_name = form.cleaned_data['artist_name']

            lyrics_finder = getLyrics()
            lyrics_finder.get_lyrics(song_title, artist_name)

            json_folder = str(lyrics_finder.pth / "lyrics/json")
            json_file_path = self.find_json_file(json_folder, song_title)

            lyrics = self.load_lyrics(json_file_path) if json_file_path else "Lyrics not found or JSON conversion failed."
            return render(request, 'lyrics_search.html', {
                'form': form,
                'song_title': song_title,
                'artist_name': artist_name,
                'lyrics': lyrics
            })
        return render(request, 'lyrics_search.html', {'form': form})

    def find_json_file(self, json_folder, song_title):
        for filename in os.listdir(json_folder):
            if filename.replace(" ", "") == song_title.replace(" ", "") + ".json":
                return os.path.join(json_folder, filename)
        return None

    def load_lyrics(self, json_file_path):
        if json_file_path and os.path.exists(json_file_path):
            with open(json_file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None

    def lyrics_edit(self, request, song_title):
        lyrics_finder = getLyrics()
        json_file_path = lyrics_finder.pth / f"lyrics/json/{song_title}.json"

        if json_file_path.exists():
            with open(json_file_path, 'r', encoding='utf-8') as f:
                lyrics_data = json.load(f)

            if request.method == 'POST':
                modified_lyrics = request.POST.get('lyrics')
                self.save_lyrics(json_file_path, modified_lyrics)
                return redirect('lyrics_search')

            return render(request, 'lyrics_edit.html', {'lyrics_data': lyrics_data, 'song_title': song_title})

        return render(request, 'lyrics_edit.html', {'error': "Lyrics not found."})

    def save_lyrics(self, json_file_path, modified_lyrics):
        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(json.loads(modified_lyrics), f, ensure_ascii=False)