from django.db import models

class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    nama_user = models.CharField(max_length=100)
    email_user = models.EmailField(unique=True)
    telp_user = models.CharField(max_length=15, blank=True, null=True)
    password_user = models.CharField(max_length=255)

    def __str__(self):
        return self.nama_user


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

    def __str__(self):
        return f"User Story ID: {self.id_user_story}"


# User Story Scenario
class UserStoryScenario(models.Model):
    user_story = models.ForeignKey(UserStory, related_name='scenarios', on_delete=models.CASCADE)
    fitur_user_story_scenario = models.CharField(max_length=255)

    def __str__(self):
        return self.fitur_user_story_scenario


# Given
class Given(models.Model):
    user_story = models.ForeignKey(UserStory, related_name='givens', on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return f"Given: {self.description[:50]}"


# When
class When(models.Model):
    user_story = models.ForeignKey(UserStory, related_name='whens', on_delete=models.CASCADE)
    given = models.ForeignKey(Given, related_name='whens', on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return f"When: {self.description[:50]}"


# Then
class Then(models.Model):
    user_story = models.ForeignKey(UserStory, related_name='thens', on_delete=models.CASCADE)
    when = models.ForeignKey(When, related_name='thens', on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return f"Then: {self.description[:50]}"


# And
class And(models.Model):
    user_story = models.ForeignKey(UserStory, related_name='ands', on_delete=models.CASCADE)
    then = models.ForeignKey(Then, related_name='ands', on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return f"And: {self.description[:50]}"



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
    class_diagram = models.OneToOneField(ClassDiagram, on_delete=models.CASCADE, related_name='sequence')

    def __str__(self):
        return f"Sequence Diagram for {self.class_diagram.pilihan_GUI}"


