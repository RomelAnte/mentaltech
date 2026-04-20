"""URLs de la aplicacion MindCraft."""
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views


urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("anagramas/", views.anagramas, name="anagramas"),
    path("palabras/", views.palabras, name="palabras"),
    path("abaco/", views.abaco, name="abaco"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
