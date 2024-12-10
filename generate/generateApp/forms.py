from django import forms
from .models import UserStory
from .models import UserStoryScenario

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
            'given': forms.Textarea(attrs={'placeholder': 'Describe the initial context'}),
            'when': forms.Textarea(attrs={'placeholder': 'Describe the triggering event'}),
            'then': forms.Textarea(attrs={'placeholder': 'Describe the expected outcome'}),
        }