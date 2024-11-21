from django.shortcuts import render

# Create your views here.


def home(request):
    context = {}
    return render(request, "generateApp/home.html", context)

def register(request):
    context = {}
    return render(request, "generateApp/register.html", context)

def login(request):
    context = {}
    return render(request, "generateApp/login.html", context)

def inputUS(request):
    context = {}
    return render(request, "generateApp/inputUS.html", context)

def resultUS(request):
    context = {}
    return render(request, "generateApp/resultUS.html", context)

def homepage(request):
    context = {}
    return render(request, "generateApp/homepage.html", context)

def gui(request):
    context = {}
    return render(request, "generateApp/gui.html", context)

def inputUSS(request):
    context = {}
    return render(request, "generateApp/inputUSS.html", context)

def resultUSS(request):
    context = {}
    return render(request, "generateApp/resultUSS.html", context)

def activity(request):
    context = {}
    return render(request, "generateApp/activity.html", context)

def sequence(request):
    context = {}
    return render(request, "generateApp/sequence.html", context)

def classDiag(request):
    context = {}
    return render(request, "generateApp/classDiag.html", context)

def create(request):
    context = {}
    return render(request, "generateApp/create.html", context)