# Generated by Django 5.1.1 on 2024-12-07 09:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityDiagram',
            fields=[
                ('id_activity_diagram', models.AutoField(primary_key=True, serialize=False)),
                ('aktor_activity_diagram', models.CharField(max_length=200)),
                ('isi_aktor_activity_diagram', models.TextField()),
                ('hasil_activity_diagram', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ClassDiagram',
            fields=[
                ('id_class_diagram', models.AutoField(primary_key=True, serialize=False)),
                ('pilihan_GUI', models.CharField(max_length=200)),
                ('isi_class', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='UserStory',
            fields=[
                ('id_user_story', models.AutoField(primary_key=True, serialize=False)),
                ('input_who', models.TextField()),
                ('input_what', models.TextField()),
                ('input_why', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id_project', models.AutoField(primary_key=True, serialize=False)),
                ('nama_project', models.CharField(max_length=200)),
                ('deskripsi_project', models.TextField(blank=True, null=True)),
                ('tanggal_project_dibuat', models.DateTimeField(auto_now_add=True)),
                ('tanggal_akses_terakhir_project', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GUI',
            fields=[
                ('id_gui', models.AutoField(primary_key=True, serialize=False)),
                ('input_who_us', models.TextField(blank=True, null=True)),
                ('input_what_us', models.TextField(blank=True, null=True)),
                ('input_why_us', models.TextField(blank=True, null=True)),
                ('project', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='gui', to='generateApp.project')),
            ],
        ),
        migrations.CreateModel(
            name='SequenceDiagram',
            fields=[
                ('id_sequence_diagram', models.AutoField(primary_key=True, serialize=False)),
                ('input_actor', models.TextField()),
                ('input_boundary', models.TextField()),
                ('input_controller', models.TextField()),
                ('input_entity', models.TextField()),
                ('hasil_sequence', models.TextField()),
                ('class_diagram', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sequence', to='generateApp.classdiagram')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no_telp', models.CharField(blank=True, max_length=15, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Then',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('user_story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thens', to='generateApp.userstory')),
            ],
        ),
        migrations.CreateModel(
            name='Given',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('user_story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='givens', to='generateApp.userstory')),
            ],
        ),
        migrations.CreateModel(
            name='And',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('then', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ands', to='generateApp.then')),
                ('user_story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ands', to='generateApp.userstory')),
            ],
        ),
        migrations.CreateModel(
            name='UserStoryScenario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fitur_user_story_scenario', models.CharField(max_length=255)),
                ('user_story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scenarios', to='generateApp.userstory')),
            ],
        ),
        migrations.CreateModel(
            name='When',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('given', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='whens', to='generateApp.given')),
                ('user_story', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='whens', to='generateApp.userstory')),
            ],
        ),
        migrations.AddField(
            model_name='then',
            name='when',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thens', to='generateApp.when'),
        ),
    ]
