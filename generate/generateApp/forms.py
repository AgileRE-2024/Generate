from django import forms
from .models import UserStory
from .models import UserStoryScenario
from django.contrib.auth.forms import UserCreationForm
from .models import *

class UserStoryForm(forms.ModelForm):
    class Meta:
        model = UserStory
        fields = ['input_who', 'input_what', 'input_why']
        labels = {
            'input_who': 'Who',
            'input_what': 'What',
            'input_why': 'Why',
        }
        widgets = {
            'input_who': forms.TextInput(attrs={'placeholder': 'Enter who'}),
            'input_what': forms.TextInput(attrs={'placeholder': 'Enter what'}),
            'input_why': forms.TextInput(attrs={'placeholder': 'Enter why'}),
        }

class UserStoryScenarioForm(forms.ModelForm):
    class Meta:
        model = UserStoryScenario
        fields = ['scenario_name', 'given', 'when', 'then']
        labels = {
            'scenario_name': 'Scenario Name',
            'given': 'Given',
            'when': 'When',
            'then': 'Then',
        }
        widgets = {
            'scenario_name': forms.TextInput(attrs={'placeholder': 'Enter scenario name'}),
            'given': forms.TextInput(attrs={'placeholder': 'Describe the initial context'}),
            'when': forms.TextInput(attrs={'placeholder': 'Describe the triggering event'}),
            'then': forms.TextInput(attrs={'placeholder': 'Describe the expected outcome'}),
        }
class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['nama_project', 'deskripsi_project']  # Sesuaikan dengan nama field di model Project
        widgets = {
            'nama_project': forms.TextInput(attrs={'placeholder': 'Type a project name'}),
            'deskripsi_project': forms.Textarea(attrs={'placeholder': 'Type a description of project'}),
        }

class RegisterForm(UserCreationForm):  # Extend from UserCreationForm
    no_telp = forms.CharField(max_length=15, required=False, label="Phone Number")

    class Meta:
        model = User
        fields = ['username', 'email', 'no_telp', 'password1', 'password2']
        labels = {
            'username': 'Username',
            'email': 'Email',
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            # Save the additional profile data
            UserProfile.objects.create(user=user, no_telp=self.cleaned_data['no_telp'])
        return user
