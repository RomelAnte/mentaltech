"""
MentalTech - Aplicacion Educativa Interactiva
Configuracion principal de Django
"""
import os
from pathlib import Path
from urllib.parse import urlparse


BASE_DIR = Path(__file__).resolve().parent.parent


def env_bool(name, default=False):
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


SECRET_KEY = os.getenv("SECRET_KEY", "mentaltech-demo-key-2024-educacion-interactiva")
DEBUG = env_bool("DEBUG", default=True)

allowed_hosts = [host.strip() for host in os.getenv("ALLOWED_HOSTS", "").split(",") if host.strip()]
if DEBUG:
    allowed_hosts.extend(["127.0.0.1", "localhost"])

render_hostname = os.getenv("RENDER_EXTERNAL_HOSTNAME", "").strip()
render_external_url = os.getenv("RENDER_EXTERNAL_URL", "").strip()
if render_hostname:
    allowed_hosts.append(render_hostname)
if render_external_url:
    parsed_url = urlparse(render_external_url)
    if parsed_url.hostname:
        allowed_hosts.append(parsed_url.hostname)

ALLOWED_HOSTS = sorted(set(allowed_hosts))

csrf_trusted_origins = [
    origin.strip()
    for origin in os.getenv("CSRF_TRUSTED_ORIGINS", "").split(",")
    if origin.strip()
]
if render_external_url:
    csrf_trusted_origins.append(render_external_url)

CSRF_TRUSTED_ORIGINS = sorted(set(csrf_trusted_origins))

INSTALLED_APPS = [
    "django.contrib.staticfiles",
    "mindcraft",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.template.context_processors.static",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

DATABASES = {}

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "collected_static"
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
