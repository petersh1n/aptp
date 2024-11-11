from django import forms
from .models import Session
from .models import Lyrics

class SessionForm(forms.ModelForm):
    class Meta:
        model = Session
        fields = '__all__'


class LyricsForm(forms.ModelForm):
    class Meta:
        model = Lyrics
        fields = ['song_title', 'artist_name', 'lyrics_text']