from urllib.parse import urljoin
from django.contrib.auth.decorators import login_required
import base64
import json
import os
import subprocess
import uuid
import zlib
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse, FileResponse
from django.contrib.auth import login as auth_login, authenticate, logout as auth_logout
from graphviz import Digraph
import requests

from generate import settings
from .forms import *
from .models import *


# Create your views here.


def home(request):
    context = {}
    return render(request, "generateApp/home.html", context)

# Register
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = RegisterForm()
    return render(request, 'generateApp/register.html', {'form': form})

# Login
def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('homepage')
        else:
            return HttpResponse("Invalid username or password")
    return render(request, 'generateApp/login.html')

# Logout
def logout(request):
    auth_logout(request)
    return redirect('home')


def inputUS(request, project_id):
    """
    View untuk memasukkan User Story baru.
    Setelah menyimpan, redirect ke resultUS dengan ID User Story yang baru disimpan.
    """
    # Dapatkan instance Project berdasarkan project_id
    project = get_object_or_404(Project, id_project=project_id)

    if request.method == 'POST':
        form = UserStoryForm(request.POST)
        if form.is_valid():
            # Buat instance UserStory tanpa menyimpan ke database dulu
            user_story = form.save(commit=False)
            # Hubungkan UserStory dengan Project
            user_story.project = project
            # Simpan ke database
            user_story.save()
            # Redirect ke halaman hasil User Story
            return redirect('resultUS', user_story_id=user_story.id_user_story)
    else:
        form = UserStoryForm()

    return render(request, 'generateApp/inputUS.html', {'form': form, 'project': project})


def resultUS(request, user_story_id=None):
    """
    View untuk menampilkan User Story.
    Jika ID diberikan, hanya menampilkan User Story dengan ID tersebut.
    """
    user_story = get_object_or_404(UserStory, id_user_story=user_story_id)

    return render(request, 'generateApp/resultUS.html', {'user_story': user_story})

@login_required
def homepage(request):
    projects = Project.objects.filter(user=request.user)
    context = {
        'projects': projects
    }
    return render(request, "generateApp/homepage.html", context)

def gui(request):
    context = {}
    return render(request, "generateApp/gui.html", context)

def inputUSS(request):
    """
    View untuk memasukkan User Story Scenario baru.
    Setelah menyimpan, redirect ke resultUSS dengan ID User Story Scenario yang baru disimpan.
    """
    if request.method == 'POST':
        form = UserStoryScenarioForm(request.POST)
        if form.is_valid():
            user_story_scenario = form.save()  # Simpan data dan dapatkan instance
            return redirect('resultUSS', scenario_id=user_story_scenario.id_user_story_scenario)  # Redirect dengan parameter
    else:
        form = UserStoryScenarioForm()
    
    return render(request, 'generateApp/inputUSS.html', {'form': form})

def resultUSS(request, scenario_id=None):
    """
    View untuk menampilkan User Story Scenario.
    Jika ID diberikan, hanya menampilkan User Story Scenario dengan ID tersebut.
    """
    if scenario_id:
        user_story_scenario = get_object_or_404(UserStoryScenario, id_user_story_scenario=scenario_id)
        user_story_scenarios = [user_story_scenario]  # Menampilkan satu data
    else:
        user_story_scenarios = UserStoryScenario.objects.all()  # Semua data jika ID tidak diberikan
    
    return render(request, 'generateApp/resultUSS.html', {'user_story_scenarios': user_story_scenarios})



def activity(request):
    context = {}
    return render(request, "generateApp/activity.html", context)

def sequence(request, id_user_story):
    # Ambil User Story berdasarkan ID
    user_story = get_object_or_404(UserStory, id_user_story=id_user_story)
    context = {
        'user_story': user_story
    }
    return render(request, "generateApp/sequence.html", context)


def classDiag(request):
    context = {}
    return render(request, "generateApp/classDiag.html", context)

def create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST)
        if form.is_valid():
            # Ambil data dari form yang sudah divalidasi
            project_name = form.cleaned_data['nama_project']
            project_description = form.cleaned_data['deskripsi_project']

            # Simpan project ke database
            project = form.save(commit=False)
            project.user = request.user  # Set user yang sedang login
            project.save()

            # Redirect ke halaman lain dengan ID project yang baru dibuat
            return redirect('generate', project_id=project.id_project)

        else:
            # Jika form tidak valid, tetap render halaman dengan error
            return render(request, "generateApp/create.html", {'form': form})
    else:
        # Jika request method adalah GET, tampilkan form kosong
        form = ProjectForm()
        return render(request, "generateApp/create.html", {'form': form})


def generate(request, project_id):
    project = get_object_or_404(Project, id_project=project_id)
    return render(request, 'generateApp/generate.html', {'project': project})


def delete_project(request, id_project):
    # Ambil objek Project berdasarkan ID
    project = get_object_or_404(Project, id_project=id_project)

    # Pastikan hanya user yang memiliki proyek yang dapat menghapusnya
    if request.user == project.user:
        # Loop through all user stories in the project
        for user_story in project.user_stories.all():
            # Loop through all sequence diagrams for each user story
            for sequence in user_story.sequences.all():
                # Check if the sequence diagram has a file
                if sequence.hasil_sequence:
                    try:
                        # Get the file path from MEDIA_ROOT
                        file_path = sequence.hasil_sequence
                        
                        # Check if the file exists and delete it
                        if os.path.exists(file_path):
                            os.remove(file_path)
                            print(f"Deleted file: {file_path}")
                    except Exception as e:
                        print(f"Error while deleting file {file_path}: {e}")
                
                # After handling the file, delete the SequenceDiagram record
                sequence.delete()

        # After deleting all associated sequence diagrams, delete the project
        project.delete()

    # Redirect to homepage after project deletion
    return redirect('homepage')


from django.shortcuts import render, get_object_or_404
from .models import Project

def project_detail(request, id_project):
    # Mengambil proyek berdasarkan id
    project = get_object_or_404(Project, id_project=id_project)
    
    # Misalnya, ambil user stories terkait proyek
    user_stories = project.user_stories.all()

    # Kirim data ke template
    return render(request, 'generateApp/project_detail.html', {
        'project': project,
        'user_stories': user_stories,
    })


import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

from datetime import datetime

timestamp = datetime.now().strftime('%Y%m%d%H%M%S')


def generate_sequence_diagram(request):
    if request.method == "POST":
        # Ambil data dari form
        user_story_id = request.POST.get('user_story_id')
        
        try:
            # Ganti 'id' dengan 'id_user_story' sesuai dengan field di model UserStory
            user_story = UserStory.objects.get(id_user_story=user_story_id)
        except UserStory.DoesNotExist:
            return JsonResponse({"success": False, "error": "User Story not found"}, status=404)
        
        actors = request.POST.getlist('actor')
        boundaries = request.POST.getlist('boundary')
        controllers = request.POST.getlist('controller')
        entities = request.POST.getlist('entity')
        
        # Proses basic path
        basic_path_inputs = request.POST.getlist('basic_path_input')
        basic_paths = []
        
        # Daftar semua elemen yang bisa digunakan
        all_elements = actors + boundaries + controllers + entities
        
        for i, basic_path in enumerate(basic_path_inputs):
            if basic_path.strip():  # Pastikan input tidak hanya spasi
                # Cari elemen awal dan akhir dengan lebih aman
                try:
                    # Gunakan indeks yang ada atau elemen default
                    start_element = (
                        actors[min(i, len(actors)-1)] if actors else 
                        boundaries[min(i, len(boundaries)-1)] if boundaries else 
                        controllers[min(i, len(controllers)-1)] if controllers else 
                        entities[min(i, len(entities)-1)]
                    )
                    end_element = (
                        controllers[min(i, len(controllers)-1)] if controllers else 
                        boundaries[min(i, len(boundaries)-1)] if boundaries else 
                        entities[min(i, len(entities)-1)] if entities else 
                        actors[min(i, len(actors)-1)]
                    )

                    basic_paths.append(f"{start_element} -> {end_element} : {basic_path}")
                except IndexError:
                    # Fallback jika tidak cukup elemen
                    if all_elements:
                        basic_paths.append(f"{all_elements[0]} -> {all_elements[1]} : {basic_path}")

        # Proses alternative paths
        alternative_path_labels = request.POST.getlist('alternative_path_label')
        alternative_path_inputs = request.POST.getlist('alternative_path_input')
        alternative_paths = []

        # Proses else paths
        else_path_labels = request.POST.getlist('else_path_label')
        else_path_inputs = request.POST.getlist('else_path_input')

        # Pemrosesan alternative paths yang lebih kompleks
        for i in range(len(alternative_path_labels)):
            if alternative_path_labels[i] and alternative_path_inputs[i]:
                # Elemen awal dan akhir untuk alternative path
                start_element = boundaries[0] if boundaries else actors[0]  # Boundary pertama
                end_element = entities[0] if entities else controllers[0]  # Entity pertama

                # Buat alternative path
                alt_path = {
                    'title': alternative_path_labels[i],
                    'path': f"{start_element} -> {end_element} : {alternative_path_inputs[i]}",
                    'else_conditions': []
                }

                # Proses else path untuk alternative path ini
                for j in range(len(else_path_labels)):
                    if else_path_labels[j] and else_path_inputs[j]:
                        # Tentukan elemen awal dan akhir untuk else path berdasarkan urutan
                        if j % 2 == 0:  # Jalur pertama else path
                            else_start = controllers[0] if controllers else actors[0]
                            else_end = actors[0] if actors else boundaries[0]
                        else:  # Jalur kedua else path
                            else_start = entities[0] if entities else boundaries[0]
                            else_end = boundaries[0] if boundaries else actors[0]
                        
                        alt_path['else_conditions'].append({
                            'title': else_path_labels[j],
                            'condition': else_path_inputs[j],
                            'path': f"{else_start} -> {else_end} : {else_path_inputs[j]}"
                        })

                alternative_paths.append(alt_path)

        # Generate script PlantUML
        plantUmlScript = "@startuml\n"
        
        # Tambahkan aktor, boundary, kontrol, dan entitas
        plantUmlScript += "\n".join([f"actor {actor}" for actor in actors if actor]) + "\n"
        plantUmlScript += "\n".join([f"boundary {boundary}" for boundary in boundaries if boundary]) + "\n"
        plantUmlScript += "\n".join([f"control {controller}" for controller in controllers if controller]) + "\n"
        plantUmlScript += "\n".join([f"entity {entity}" for entity in entities if entity]) + "\n"
        
        # Tambahkan basic paths
        plantUmlScript += "\n".join(basic_paths) + "\n"

        # Tambahkan alternative paths
        for alt_path in alternative_paths:
            plantUmlScript += f'alt {alt_path["title"]}\n'
            plantUmlScript += f'{alt_path["path"]}\n'
            
            # Tambahkan else conditions
            for else_condition in alt_path['else_conditions']:
                plantUmlScript += f'else {else_condition["title"]}\n'
                plantUmlScript += f'{else_condition["path"]}\n'
            
            plantUmlScript += "end\n"

        plantUmlScript += "@enduml\n"
        
        # Simpan kode PlantUML ke file .puml
        plantuml_file_path = os.path.join(settings.BASE_DIR, 'tools', 'sequence_diagram.puml')
        with open(plantuml_file_path, 'w', encoding='utf-8') as file:
            file.write(plantUmlScript)
            
        diagrams_dir = os.path.join(settings.MEDIA_ROOT, 'diagrams')
        os.makedirs(diagrams_dir, exist_ok=True)  # Membuat direktori diagrams jika belum ada

        # Jalankan PlantUML untuk menghasilkan diagram PNG
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")  # Ganti dengan timestamp dinamis
        output_filename = f"sequence_diagram_{timestamp}.png" 

        command = [
            'java', '-jar', os.path.join(settings.BASE_DIR, 'tools', 'plantuml-mit-1.2024.8.jar'),
            plantuml_file_path, '-o', diagrams_dir
        ]
        
        try:
            subprocess.run(command, check=True)

            # Setelah PlantUML selesai, file output akan memiliki nama default yang sama dengan file .puml
            default_output_file = os.path.join(diagrams_dir, 'sequence_diagram.png')

            if os.path.exists(default_output_file):
                new_output_file = os.path.join(diagrams_dir, output_filename)
                os.rename(default_output_file, new_output_file)  

                image_url = f"/media/diagrams/{output_filename}"

                sequence_diagram = SequenceDiagram(
                input_actor=', '.join(actors),
                input_boundary=', '.join(boundaries),
                input_controller=', '.join(controllers),
                input_entity=', '.join(entities),
                hasil_sequence=image_url,  
                user_story=user_story 
                )

                sequence_diagram.save()

                return JsonResponse({
                    "success": True,
                    "image_url": image_url
                })
            else:
                return JsonResponse({"success": False, "error": "Diagram generation failed"}, status=500)
        except subprocess.CalledProcessError as e:
            logger.error("PlantUML execution error: %s", e)
            return JsonResponse({"success": False, "error": f"PlantUML execution error: {e}"}, status=500)
        except Exception as e:
            logger.error("Unexpected error: %s", e)
            return JsonResponse({"success": False, "error": f"Unexpected error: {e}"}, status=500)