from django.db import models

# Create your models here.


class BasicPath(models.Model):
    path_name = models.CharField(max_length=100)
    object_start = models.CharField(max_length=100)
    object_end = models.CharField(max_length=100)

    def __str__(self):
        return self.path_name

class ActorFeature(models.Model):
    actor_name = models.CharField(max_length=255)
    feature_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.actor_name} - {self.feature_name}"

# Updated SequenceDiagram model
class SequenceDiagram(models.Model):
    name = models.CharField(max_length=100)  # Nama sequence diagram (e.g., "Sequence Diagram [Feature]")
    actor_feature = models.ForeignKey(ActorFeature, on_delete=models.CASCADE)  # Referensi ke ActorFeature

    def __str__(self):
        return self.name

# Separate models for Boundary, Controller, Entity, and Path
class Boundary(models.Model):
    name = models.CharField(max_length=30)
    sequence_diagram = models.ForeignKey(SequenceDiagram, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Controller(models.Model):
    name = models.CharField(max_length=30)
    sequence_diagram = models.ForeignKey(SequenceDiagram, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Entity(models.Model):
    name = models.CharField(max_length=30)
    sequence_diagram = models.ForeignKey(SequenceDiagram, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Path(models.Model):
    basic_path = models.ForeignKey(BasicPath, on_delete=models.CASCADE)
    sequence_diagram = models.ForeignKey(SequenceDiagram, on_delete=models.CASCADE)

    def __str__(self):
        return f"Path for {self.sequence_diagram.name}"