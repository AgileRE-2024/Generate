from django.shortcuts import render

# Create your views here.


def home(request):
    context = {}
    return render(request, "generateApp/home.html", context)

def login(request):
    context = {}
    return render(request, "generateApp/login.html", context)