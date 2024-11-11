from requests import get  # type: ignore
from bs4 import BeautifulSoup  # type: ignore
from pathlib import Path

import json
import unicodedata


"""
ARTIST NAMES SHOULD INCLUDE:

마커스
WELOVE
제이어스
어노인팅
아이자야
"""


class GetLyrics:
    def __init__(self):
        self.pth = Path(__file__).resolve().parent.parent
        self.print_it = True

    def _print(self, x):
        print(x) if self.print_it else None

    def _save_as_txt_(self, song_title: str, lyrics: str):
        txt_path = self.pth / f"lyrics/txt/{song_title}.txt"
        if not txt_path.exists():
            with open(txt_path, "w") as lyrics_txt:
                lyrics_txt.write(lyrics)

        if not self._is_fit_style_(txt_path):
            self._print(
                f"Go to lyrics/txt/{song_title}.txt and set the lyrics part manually."
            )

    def _is_fit_style_(self, file: str):
        try:
            with open(file, "r") as f:
                text_segments = f.read().split("\n")
        except FileNotFoundError:
            self._print(f"File [{file}] not found.")
            return False

        is_fit = True

        def check_idx_exitsts(
            segment: str,
        ):
            if len(segment) == 1:
                return True
            elif len(segment) == 2 and segment[1].isdigit():
                return True
            else:
                return False

        idx_exists = False
        for segment in text_segments:
            if len(segment) > 24:
                is_fit = False
                break
            if not idx_exists and check_idx_exitsts(segment):
                idx_exists = True

        if not idx_exists:
            is_fit = False

        if not is_fit:
            self._print(
                f"Cannot make it to json because the style is wrong. Check [{file}] again."
            )

        return is_fit

    def get_lyrics(self, song_title: str, artist_name="thisisnotanartistname"):
        # JSON 파일 존재 여부 확인
        json_folder = self.pth / "lyrics/json"
        for file in json_folder.glob("*.json"):
            title = unicodedata.normalize("NFC", file.stem)
            if song_title.replace(" ", "") in title.replace(" ", ""):
                self._print(
                    f"Lyrics json file [{song_title}.json] exists in [/lyrics/json] folder.\n"
                )
                return True

        # TXT 파일 존재 여부 확인
        txt_folder = self.pth / "lyrics/txt"
        for file in txt_folder.glob("*.txt"):
            title = unicodedata.normalize("NFC", file.stem)
            if song_title.strip() in title.strip():
                self._print("Lyrics txt file exists in [/lyrics/txt] folder.")
                return True

        song_title = song_title.replace(" ", "+")
        url = f"https://www.melon.com/search/total/index.htm?q={song_title}&section=&mwkLogType=T"
        response = get(url, headers={"User-Agent": "XY"})
        soup = BeautifulSoup(response.text, "html.parser")

        titles = soup.find_all("a", title="곡정보 보기")
        artists = soup.find_all("div", id="artistName")

        lyrics = []
        while not lyrics:
            # 아티스트 이름이 주어지지 않은 경우
            if artist_name == "thisisnotanartistname":
                print(
                    f"Search results for {song_title.replace('+', ' ')}...\n[NO ARTIST NAME ENTERED]\n"
                )
                for i in range(min(5, len(artists))):
                    (
                        print(f"{i + 1}] {artists[i].a.text}")
                        if artists[i].a
                        else print(f"{i + 1}] ")
                    )
                artist_name = artists[int(input("Choose the artist: ")) - 1].a.text

            # 아티스트 매칭 확인
            idx = next(
                (i for i, artist in enumerate(artists) if artist_name in artist.a.text),
                None,
            )
            if idx is None:
                print(f"Cannot find {artist_name}!\n")
                artist_name = "thisisnotanartistname"
                continue

            text = titles[idx // 3]["href"]
            song_id = text[text.rfind("(") + 2 : -3]
            song_url = f"https://www.melon.com/song/detail.htm?songId={song_id}"

            response = get(song_url, headers={"User-Agent": "XY"})
            soup = BeautifulSoup(response.text, "html.parser")
            lyrics = soup.find_all("div", class_="lyric")

            if not lyrics:
                artist_name = ""
                print("[NO LYRICS FOUND]")

        # 가사 처리 및 저장
        remove_0 = '<div class="lyric" id="d_video_summary"><!-- height:auto; 로 변경시, 확장됨 -->'
        remove_1 = "</div>"
        remove_2 = "<br/>"

        lyrics = str(lyrics[0]).replace(remove_0, "")
        lyrics = lyrics.replace(remove_1, "")
        lyrics = lyrics.replace(remove_2, "\n")
        lyrics = str.strip(lyrics)

        song_title = song_title.replace("+", " ")
        self._save_as_txt_(song_title, lyrics)

        return False

    def _part_separation_to_json_(self, file: Path, title: str):
        with open(file, "r") as f:
            lyrics_txt = f.read().split("\n")

        # 파트 구분
        lyrics_parts = [
            lyric
            for lyric in lyrics_txt
            if len(lyric) in [1, 2]
            and (lyric[1].isdigit() if len(lyric) == 2 else True)
        ]
        idx = [lyrics_txt.index(part) for part in lyrics_parts] + [len(lyrics_txt)]

        # 가사 딕셔너리 생성
        output = {
            lyrics_parts[i]: "\n".join(lyrics_txt[idx[i] + 1 : idx[i + 1]]).strip()
            for i in range(len(lyrics_parts))
        }

        # JSON 파일 작성
        with open(self.pth / f"lyrics/json/{title}.json", "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False)

    def _txt_to_json_(self, song_title: str):
        txt_folder = self.pth / "lyrics/txt"
        for file in txt_folder.glob("*.txt"):
            title = unicodedata.normalize("NFC", file.stem)
            if title == song_title:
                self._part_separation_to_json_(file, title)
                print("Json conversion complete \n")
                return True

        print(f"No txt file named {song_title} found.")

        return False


if __name__ == "__main__":
    GetLyrics = GetLyrics()
    title = ""
    GetLyrics.get_lyrics(song_title=title, artist_name="")  # thisisnotanartistname
    GetLyrics._txt_to_json_(title)  # JSON 변환을 수행
