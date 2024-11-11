from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Lyrics

@receiver(post_save, sender=Lyrics)
def get_lyrics_view_on_change(sender, instance, created, **kwargs):
    if created:
        # 새로운 Lyrics 인스턴스가 생성된 경우
        print(f"{instance.song_title} by {instance.artist_name} has been added.")
        # 필요한 추가 작업을 여기서 수행