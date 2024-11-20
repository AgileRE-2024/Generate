from django.contrib import admin
from .models import User, Project, GUI, UserStoryScenario, ActivityDiagram, ClassDiagram, SequenceDiagram

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id_user', 'nama_user', 'email_user', 'telp_user')
    search_fields = ('nama_user', 'email_user')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id_project', 'nama_project', 'user', 'tanggal_project_dibuat', 'tanggal_akses_terakhir_project')
    search_fields = ('nama_project', 'user__nama_user')
    list_filter = ('tanggal_project_dibuat',)


@admin.register(GUI)
class GUIAdmin(admin.ModelAdmin):
    list_display = ('id_gui', 'project', 'input_who_us', 'input_what_us', 'input_why_us')
    search_fields = ('project__nama_project',)

@admin.register(UserStoryScenario)
class UserStoryScenarioAdmin(admin.ModelAdmin):
    list_display = ('id_user_story_scenario', 'fitur_user_story_scenario', 'scenario_user_story_scenario')
    search_fields = ('fitur_user_story_scenario',)


@admin.register(ActivityDiagram)
class ActivityDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_activity_diagram', 'aktor_activity_diagram', 'isi_aktor_activity_diagram', 'hasil_activity_diagram')
    search_fields = ('aktor_activity_diagram',)


@admin.register(ClassDiagram)
class ClassDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_class_diagram', 'pilihan_GUI', 'isi_class')
    search_fields = ('pilihan_GUI',)


@admin.register(SequenceDiagram)
class SequenceDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_sequence_diagram', 'class_diagram', 'input_actor', 'hasil_sequence')
    search_fields = ('class_diagram__pilihan_GUI',)