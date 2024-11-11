from django.shortcuts import render, redirect, get_object_or_404
from Snacklabs_app.models import Section

def save_section(request):
    if request.method == 'POST':
        section_title = request.POST.get('section_title')
        if section_title:
            Section.objects.create(title=section_title)
            return redirect('index')
    return render(request, 'base.html')

def delete_section(request, section_id):
    section = get_object_or_404(Section, id=section_id)
    section.delete()
    return redirect('index')