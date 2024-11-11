from django.shortcuts import render

def index(request):
    # 메인 페이지 렌더링
    return render(request, 'index.html')