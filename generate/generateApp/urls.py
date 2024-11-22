from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.login, name="login"),
    path('register/', views.register, name="register"),
    path('inputUS/', views.inputUS, name="inputUS"),
    path('resultUS/<int:user_story_id>/', views.resultUS, name="resultUS"),
    path('homepage/', views.homepage, name="homepage"),
    path('gui/', views.gui, name="gui"),
    path('inputUSS/<int:user_story_id>/', views.inputUSS, name="inputUSS"),
    path('resultUSS/', views.resultUSS, name="resultUSS"),
    path('activity/', views.activity, name="activity"),
    path('sequence/', views.sequence, name="sequence"),
    path('classDiag/', views.classDiag, name="classDiag"),
    path('create/', views.create, name="create"),
]