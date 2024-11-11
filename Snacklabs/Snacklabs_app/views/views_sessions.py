from django.shortcuts import render, get_object_or_404, redirect
from Snacklabs_app.models import Session
from Snacklabs_app.forms import SessionForm

def session_list(request):
    sessions = Session.objects.all()
    return render(request, 'session_list.html', {'sessions': sessions})

def session_new(request):
    if request.method == "POST":
        form = SessionForm(request.POST)
        if form.is_valid():
            session = form.save()
            return redirect('session_detail', pk=session.pk)
    else:
        form = SessionForm()
    return render(request, 'session_form.html', {'form': form})

def session_detail(request, pk):
    session = get_object_or_404(Session, pk=pk)
    return render(request, 'session_detail.html', {'session': session})
