from django.contrib import admin
from .models import (
    UserProfile, Project, GUI, UserStory, UserStoryScenario,
    ActivityDiagram, ClassDiagram, SequenceDiagram, ResultAct, ResultClass
)

# Admin untuk UserProfile
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'no_telp')
    search_fields = ('user__username', 'no_telp')

# Admin untuk Project
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id_project', 'nama_project', 'user', 'tanggal_project_dibuat', 'tanggal_akses_terakhir_project')
    search_fields = ('nama_project', 'user__username')
    list_filter = ('tanggal_project_dibuat',)

# Admin untuk GUI
@admin.register(GUI)
class GUIAdmin(admin.ModelAdmin):
    list_display = ('id_gui', 'project', 'input_who_us', 'input_what_us', 'input_why_us')
    search_fields = ('project__nama_project',)

# Admin untuk UserStory
@admin.register(UserStory)
class UserStoryAdmin(admin.ModelAdmin):
    list_display = ('id_user_story', 'project', 'input_who', 'input_what', 'input_why')
    search_fields = ('input_who', 'input_what', 'input_why', 'project__nama_project')

# Admin untuk UserStoryScenario
@admin.register(UserStoryScenario)
class UserStoryScenarioAdmin(admin.ModelAdmin):
    list_display = ('id_user_story_scenario', 'scenario_name', 'given', 'when', 'then')
    search_fields = ('scenario_name', 'given', 'when', 'then')

# Admin untuk ActivityDiagram
@admin.register(ActivityDiagram)
class ActivityDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_activity_diagram', 'aktor_activity_diagram', 'isi_aktor_activity_diagram', 'hasil_activity_diagram')
    search_fields = ('aktor_activity_diagram',)

# Admin untuk ClassDiagram
@admin.register(ClassDiagram)
class ClassDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_class_diagram', 'pilihan_GUI', 'isi_class')
    search_fields = ('pilihan_GUI',)

# Admin untuk ResultActivityDiagram
@admin.register(ResultAct)
class ResultActAdmin(admin.ModelAdmin):
    list_display = ('id_resultA', 'namaA')
    search_fields = ('namaA',)

# Admin untuk ResultClassDiagram
@admin.register(ResultClass)
class ResultClassAdmin(admin.ModelAdmin):
    list_display = ('id_resultC', 'namaC')
    search_fields = ('namaC',)


# Admin untuk SequenceDiagram
@admin.register(SequenceDiagram)
class SequenceDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_sequence_diagram', 'input_actor', 'input_boundary', 'input_controller', 'input_entity', 'hasil_sequence')
    search_fields = ('input_actor', 'input_boundary', 'input_controller', 'input_entity')
