from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.login, name="login"),
    path('register/', views.register, name="register"),
    path('inputUS/', views.inputUS, name="inputUS"),
    path('resultUS/', views.resultUS, name="resultUS"),
    path('homepage/', views.homepage, name="homepage"),
    path('gui/', views.gui, name="gui"),
]