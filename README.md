# MentalTech - Aplicacion Educativa Interactiva

Herramienta educativa para exposicion academica con 3 modulos interactivos:
Anagramas, Palabras concretas/abstractas y Abaco.

## Ejecucion local

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py runserver
```

Abre `http://127.0.0.1:8000/`.

## Despliegue en Render

El repositorio ya incluye `render.yaml`, asi que puedes crear el servicio como Blueprint o copiar estos valores manualmente:

- Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- Start Command: `gunicorn core.wsgi:application`

Variables recomendadas en Render:

- `DEBUG=False`
- `SECRET_KEY=<una clave larga y privada>`
- `ALLOWED_HOSTS=<tu-servicio>.onrender.com`
- `CSRF_TRUSTED_ORIGINS=https://<tu-servicio>.onrender.com`

Render suele inyectar `RENDER_EXTERNAL_HOSTNAME` y `RENDER_EXTERNAL_URL`, y el proyecto ya los aprovecha si estan disponibles.

## Notas tecnicas

- El proyecto no usa base de datos.
- Los archivos estaticos se sirven con WhiteNoise.
- Se eliminaron dependencias pesadas no usadas para hacer el deploy mas rapido y estable.
