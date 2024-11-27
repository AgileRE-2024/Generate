from django.contrib import admin
from .models import (
    User, Project, GUI, UserStory, UserStoryScenario,
    Given, When, Then, And,
    ActivityDiagram, ClassDiagram, SequenceDiagram
)

# Admin untuk User
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id_user', 'nama_user', 'email_user', 'telp_user')
    search_fields = ('nama_user', 'email_user')


# Admin untuk Project
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id_project', 'nama_project', 'user', 'tanggal_project_dibuat', 'tanggal_akses_terakhir_project')
    search_fields = ('nama_project', 'user__nama_user')
    list_filter = ('tanggal_project_dibuat',)


# Admin untuk GUI
@admin.register(GUI)
class GUIAdmin(admin.ModelAdmin):
    list_display = ('id_gui', 'project', 'input_who_us', 'input_what_us', 'input_why_us')
    search_fields = ('project__nama_project',)


# Admin untuk UserStory
@admin.register(UserStory)
class UserStoryAdmin(admin.ModelAdmin):
    list_display = ('id_user_story', 'input_who', 'input_what', 'input_why')
    search_fields = ('input_who', 'input_what', 'input_why')


# Inline untuk membantu menampilkan data yang saling terkait
class UserStoryScenarioInline(admin.TabularInline):
    model = UserStoryScenario
    extra = 1


class GivenInline(admin.TabularInline):
    model = Given
    extra = 1


class WhenInline(admin.TabularInline):
    model = When
    extra = 1


class ThenInline(admin.TabularInline):
    model = Then
    extra = 1


class AndInline(admin.TabularInline):
    model = And
    extra = 1



@admin.register(UserStoryScenario)
class UserStoryScenarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'fitur_user_story_scenario', 'user_story')


@admin.register(Given)
class GivenAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'user_story')


@admin.register(When)
class WhenAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'user_story', 'given')


@admin.register(Then)
class ThenAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'user_story', 'when')


@admin.register(And)
class AndAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'user_story', 'then')


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


# Admin untuk SequenceDiagram
@admin.register(SequenceDiagram)
class SequenceDiagramAdmin(admin.ModelAdmin):
    list_display = ('id_sequence_diagram', 'class_diagram', 'input_actor', 'hasil_sequence')
    search_fields = ('class_diagram__pilihan_GUI',)
