from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    no_telp = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.user.username


class Project(models.Model):
    id_project = models.AutoField(primary_key=True)
    nama_project = models.CharField(max_length=200)
    deskripsi_project = models.TextField(blank=True, null=True)
    tanggal_project_dibuat = models.DateTimeField(auto_now_add=True)
    tanggal_akses_terakhir_project = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.nama_project


class GUI(models.Model):
    id_gui = models.AutoField(primary_key=True)
    input_who_us = models.TextField(blank=True, null=True)
    input_what_us = models.TextField(blank=True, null=True)
    input_why_us = models.TextField(blank=True, null=True)
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='gui')

    def __str__(self):
        return f"GUI for {self.project.nama_project}"

# User Story
class UserStory(models.Model):
    id_user_story = models.AutoField(primary_key=True)
    input_who = models.TextField()
    input_what = models.TextField()
    input_why = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='user_stories')

    def __str__(self):
        return f"User Story ID: {self.id_user_story}"


class UserStoryScenario(models.Model):
    id_user_story_scenario = models.AutoField(primary_key=True)
    scenario_name = models.TextField(null=True)
    given = models.TextField(null=True)
    when = models.TextField(null=True)
    then = models.TextField(null=True)

    def __str__(self):
        return f"User Story Scenario ID: {self.id_user_story_scenario}"


class ActivityDiagram(models.Model):
    id_activity_diagram = models.AutoField(primary_key=True)
    aktor_activity_diagram = models.CharField(max_length=200)
    isi_aktor_activity_diagram = models.TextField()
    hasil_activity_diagram = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Aktor: {self.aktor_activity_diagram}"


class ClassDiagram(models.Model):
    id_class_diagram = models.AutoField(primary_key=True)
    pilihan_GUI = models.CharField(max_length=200)
    isi_class = models.TextField()

    def __str__(self):
        return f"Class Diagram - {self.pilihan_GUI}"


class SequenceDiagram(models.Model):
    id_sequence_diagram = models.AutoField(primary_key=True)
    input_actor = models.TextField()
    input_boundary = models.TextField()
    input_controller = models.TextField()
    input_entity = models.TextField()
    hasil_sequence = models.TextField()
    user_story = models.ForeignKey(UserStory, on_delete=models.CASCADE, related_name='sequences')

    def __str__(self):
        return f"Sequence Diagram for User Story {self.user_story.id_user_story}"


