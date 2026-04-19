"""URLs de la aplicación MindCraft"""
from django.urls import path

from core import settings

from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('anagramas/', views.anagramas, name='anagramas'),
    path('palabras/', views.palabras, name='palabras'),
    path('abaco/', views.abaco, name='abaco'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
