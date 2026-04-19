"""URLs principales del proyecto MentalTech"""
from django.urls import path, include

urlpatterns = [
    path('', include('mindcraft.urls')),
]
