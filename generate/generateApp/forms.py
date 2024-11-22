from django import forms
from .models import UserStory

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
