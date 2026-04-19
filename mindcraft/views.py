"""
Vistas de MentalTech - Aplicación Educativa Interactiva
Sin base de datos - solo renderizado de templates
"""
from django.shortcuts import render


def dashboard(request):
    """Página principal con los 3 módulos"""
    return render(request, 'mindcraft/dashboard.html')


def anagramas(request):
    """Módulo 1: Anagramas - Presentación + Actividad"""
    return render(request, 'mindcraft/anagramas.html')


def palabras(request):
    """Módulo 2: Palabras Concretas y Abstractas"""
    return render(request, 'mindcraft/palabras.html')


def abaco(request):
    """Módulo 3: Ábaco - Generador de números"""
    return render(request, 'mindcraft/abaco.html')
