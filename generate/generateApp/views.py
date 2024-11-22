from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from .models import *


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
    """
    View untuk memasukkan User Story baru.
    Setelah menyimpan, redirect ke resultUS dengan ID User Story yang baru disimpan.
    """
    if request.method == 'POST':
        form = UserStoryForm(request.POST)
        if form.is_valid():
            user_story = form.save()  # Simpan data dan dapatkan instance
            return redirect('resultUS', user_story_id=user_story.id_user_story)  # Parsing ID
    else:
        form = UserStoryForm()
    
    return render(request, 'generateApp/inputUS.html', {'form': form})


def resultUS(request, user_story_id=None):
    """
    View untuk menampilkan User Story.
    Jika ID diberikan, hanya menampilkan User Story dengan ID tersebut.
    """
    if user_story_id:
        user_story = get_object_or_404(UserStory, id_user_story=user_story_id)
        user_stories = [user_story]  # Hanya satu data yang ditampilkan
    else:
        user_stories = UserStory.objects.all()  # Semua data jika ID tidak diberikan
    
    return render(request, 'generateApp/resultUS.html', {'user_stories': user_stories})

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