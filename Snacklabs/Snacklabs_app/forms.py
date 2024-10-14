from django import forms
from .models import Session

class SessionForm(forms.ModelForm):
    class Meta:
        model = Session
        fields = '__all__'


class LyricsForm(forms.Form):
    song_title = forms.CharField(label='Song Title', max_length=100)
    artist_name = forms.CharField(label='Artist Name', max_length=100, required=False)