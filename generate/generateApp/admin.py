from django.contrib import admin
from .models import *

@admin.register(BasicPath)
class BasicPathAdmin(admin.ModelAdmin):
    list_display = ('path_name', 'object_start', 'object_end')  # Kolom yang terlihat
    search_fields = ('path_name', 'object_start', 'object_end')  # Fitur pencarian


@admin.register(ActorFeature)
class ActorFeatureAdmin(admin.ModelAdmin):
    list_display = ('actor_name', 'feature_name')
    search_fields = ('actor_name', 'feature_name')


@admin.register(SequenceDiagram)
class SequenceDiagramAdmin(admin.ModelAdmin):
    list_display = ('name', 'actor_feature')
    search_fields = ('name', 'actor_feature__actor_name')  # Cari berdasarkan actor


@admin.register(Boundary)
class BoundaryAdmin(admin.ModelAdmin):
    list_display = ('name', 'sequence_diagram')
    search_fields = ('name', 'sequence_diagram__name')


@admin.register(Controller)
class ControllerAdmin(admin.ModelAdmin):
    list_display = ('name', 'sequence_diagram')
    search_fields = ('name', 'sequence_diagram__name')


@admin.register(Entity)
class EntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'sequence_diagram')
    search_fields = ('name', 'sequence_diagram__name')


@admin.register(Path)
class PathAdmin(admin.ModelAdmin):
    list_display = ('basic_path', 'sequence_diagram')
    search_fields = ('basic_path__path_name', 'sequence_diagram__name')
