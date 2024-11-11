from pathlib import Path
from Snacklabs_app.models import Lyrics
from django.conf import settings

import json
import os

def save(self, *args, **kwargs):
        # lyrics_text가 비어있는지 확인
        if not self.lyrics_text.strip():  # .strip()을 사용하여 공백만 있는지 체크
            raise ValueError("Lyrics text cannot be empty.")
        
        # 파일 경로 설정
        file_path = Path(settings.MEDIA_ROOT) / 'lyrics' / f"{self.song_title}.txt"
        
        # 디렉토리 확인 및 생성
        os.makedirs(file_path.parent, exist_ok=True)  # 부모 디렉토리 생성

        # 텍스트 파일로 저장
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(self.lyrics_text)
        
        super().save(*args, **kwargs)