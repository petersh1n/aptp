# context_processors.py
from .models import Section

def section_list(request):
    sections = Section.objects.all()
    return {'sections': sections}