from django.db import models
from django.core.serializers.json import DjangoJSONEncoder
from pathlib import Path
from django.conf import settings


import json
import os

class Section(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Session(models.Model):
    date = models.DateField()
    sermon_title = models.CharField(max_length=200)
    sermon_bible = models.CharField(max_length=200)
    insermon_bible = models.JSONField()  # 이 필드는 JSON 형태로 저장됩니다.
    title_kr = models.JSONField()
    title_en = models.JSONField()
    lyrics_list = models.JSONField()
    sequence_list = models.JSONField()
    name = models.CharField(max_length=100)
    preacher = models.CharField(max_length=100)
    version = models.CharField(max_length=100)
    aftersermon = models.TextField()
    offering = models.CharField(max_length=200)

    def __str__(self):
        return self.sermon_title
    
    def to_json(self):
        return json.dumps(self, cls=DjangoJSONEncoder)
    

class Lyrics(models.Model):
    song_title = models.CharField(max_length=255)  # 노래 제목
    artist_name = models.CharField(max_length=255)  # 가수 이름
    lyrics_text = models.TextField()  # TXT 파일 내용을 저장할 필드
    
    def __str__(self):
        return f"{self.song_title} - {self.artist_name}"