from django.shortcuts import render, redirect  # type: ignore
from Snacklabs_app.models import Lyrics
from Snacklabs_app.lyrics.get_lyrics import GetLyrics
from Snacklabs_app.lyrics.edit_lyrics import slideWrite
from pathlib import Path

import subprocess


def get_lyrics_index(request):
    # 곡 데이터를 초기화 (모든 Lyrics 객체 삭제)
    Lyrics.objects.all().delete()

    if request.method == "POST":
        # 사용자가 입력한 step 수를 가져와 첫 단계로 리디렉션
        step_count = request.POST.get("step_count")
        request.session["total_steps"] = int(step_count)  # total_steps 세션에 저장
        return redirect("get_lyrics_step", step=1)  # 첫 번째 단계로 이동

    return render(request, "get_lyrics_index.html")


def get_lyrics_step(
    request,
    step: int,
):
    # 입력받은 곡의 총 개수
    total_steps = request.session.get("total_steps", 1)  # 기본값 1
    print("Total Steps from session:", total_steps)

    context = {
        "step": step,
        "total_steps": total_steps,
    }

    if request.method == "POST":
        song_title = request.POST.get("song_title")
        artist_name = request.POST.get("artist_name")
        print(artist_name)

        get_lyrics_instance = GetLyrics()

        # get_lyrics 메서드에서 저장한 txt 파일 경로를 가져옴
        txt_path = Path(f"Snacklabs_app/lyrics/txt/{song_title}.txt")
        if not txt_path.exists():
            get_lyrics_instance.get_lyrics(
                song_title=song_title, artist_name=artist_name
            )

        try:
            # get_lyrics 메서드에서 저장한 txt 파일 경로를 가져옴
            is_style_fit = get_lyrics_instance._is_fit_style_(str(txt_path))
            # get_lyrics 메서드에서 저장한 txt 파일 경로를 가져옴
            if not is_style_fit:
                error_message = f"Cannot make it to json because the style is wrong. Check [{txt_path}] again from admin."

                context["error_message"] = error_message

                # # edit_lyrics.py 실행
                # if song_title:
                #     sW = slideWrite(ppt_file=None, layout_dict=None, variable_list=None)
                #     sW._prepare_lyrics_(song_title)  # song_title을 _prepare_lyrics_에 전달
                #     context = {"message": f"{song_title}의 가사가 준비되었습니다."}
                #     return render(request, "get_lyrics_step.html", context)
                # else:
                #     context = {"error": "노래 제목이 제공되지 않았습니다."}
                # try:
                #     subprocess.run(['python', 'edit_lyrics.py', txt_path], check=True)
                # except subprocess.CalledProcessError as e:
                #     context['error_message'] += f" Failed to open edit_lyrics.py: {e}"
                # return render(request, 'get_lyrics_step.html', context)

        except Exception as e:
            error_message = f"Error occurred while saving lyrics: {str(e)}"
            context["error_message"] = error_message
            return render(request, "get_lyrics_step.html", context)

        else:
            # 파일이 유효한 경우 Lyrics 모델에 저장
            with open(txt_path, "r") as file:
                lyrics_content = file.read()

            # Lyrics 모델에 저장
            lyrics_instance, created = Lyrics.objects.get_or_create(
                song_title=song_title,
                artist_name=artist_name,
                defaults={"lyrics_text": lyrics_content},
            )

            # 만약 이미 존재하는 경우에는 가사 내용을 업데이트
            if not created:
                lyrics_instance.lyrics_text = lyrics_content
                lyrics_instance.save()
                print(f"{song_title} editing is complete on the admin page")

            txt_to_json = get_lyrics_instance._txt_to_json_(song_title)
            if txt_to_json:
                if step < total_steps:
                    return redirect(
                        "get_lyrics_step", step=step + 1
                    )  # 다음 단계로 이동
                else:
                    return redirect(
                        "get_lyrics_complete"
                    )  # 모든 단계가 완료되었으므로 완료 페이지로 이동)
    return render(request, "get_lyrics_step.html", context)


def get_lyrics_complete(request):
    # DB에서 모든 Lyrics 객체를 가져옴
    lyrics_list = Lyrics.objects.all()

    return render(request, "get_lyrics_complete.html", {"lyrics_list": lyrics_list})
