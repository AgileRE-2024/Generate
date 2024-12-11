from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.login, name="login"),
    path('register/', views.register, name="register"),
    path('logout/', views.logout, name='logout'),
    path('inputUS/<int:project_id>/', views.inputUS, name="inputUS"),
    path('resultUS/<int:user_story_id>/', views.resultUS, name="resultUS"),
    path('homepage/', views.homepage, name="homepage"),
    path('gui/', views.gui, name="gui"),
    path('inputUSS', views.inputUSS, name="inputUSS"),
    path('resultUSS/<int:scenario_id>/', views.resultUSS, name='resultUSS'),
    path('activity/', views.activity, name="activity"),
    path('sequence/<int:id_user_story>/', views.sequence, name="sequence"),
    path('classDiag/', views.classDiag, name="classDiag"),
    path('create/', views.create, name="create"),
    path('generate/<int:project_id>/', views.generate, name='generate'),
    path('delete_project/<int:id_project>/', views.delete_project, name='delete_project'),
    path('project/<int:id_project>/', views.project_detail, name='project_detail'),
    path('generate-sequence-diagram/', views.generate_sequence_diagram, name='generate_sequence_diagram'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)