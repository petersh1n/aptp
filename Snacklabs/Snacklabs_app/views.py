from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Session, Lyrics
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


def lyrics_search(request):
    if request.method == 'POST':
        form = LyricsForm(request.POST)
        if form.is_valid():
            song_title = form.cleaned_data['song_title']
            artist_name = form.cleaned_data['artist_name']

            # getLyrics 클래스의 가사 검색 기능 호출
            lyrics_finder = getLyrics()
            lyrics_finder.get_lyrics(song_title, artist_name)

            # 검색된 가사 데이터를 파일에서 읽어오기 (json 파일)
            json_folder = str(lyrics_finder.pth / "lyrics/json")
            json_file_path = None

            # 디렉토리 내 모든 JSON 파일을 확인하여 일치하는 파일 찾기
            for filename in os.listdir(json_folder):
                if filename.replace(" ", "") == song_title.replace(" ", "") + ".json":  # 띄어쓰기 제거 후 비교
                    json_file_path = os.path.join(json_folder, filename)  # 전체 경로 생성
                    break

            if json_file_path and os.path.exists(json_file_path):
                with open(json_file_path, 'r', encoding='utf-8') as f:
                    lyrics_data = json.load(f)
            else:
                lyrics_data = {}

            return render(request, 'lyrics_search.html', {
                'form': form,
                'song_title': song_title,
                'artist_name': artist_name,
                'lyrics_data': lyrics_data
            })
    else:
        form = LyricsForm()

    return render(request, 'lyrics_search.html', {'form': form})


def lyrics_save(request, song_title):
    if request.method == 'POST':
        lyrics_data = request.POST.get('lyrics_data', '')
        # JSON 데이터로 변환
        lyrics_dict = {}
        for line in lyrics_data.splitlines():
            if ':' in line:
                key, value = line.split(':', 1)
                lyrics_dict[key.strip()] = value.strip()

        lyrics_finder = getLyrics()
        json_file_path = lyrics_finder.pth / f"lyrics/json/{song_title}.json"

        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(lyrics_dict, f, ensure_ascii=False, indent=4)

        return redirect('lyrics_search')  # 수정 완료 후 검색 페이지로 리다이렉트
    return HttpResponse("Invalid request method.")