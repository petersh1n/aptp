from django.db import models
import json
from django.core.serializers.json import DjangoJSONEncoder

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