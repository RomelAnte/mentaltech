# 🧠 MentalTech — Aplicación Educativa Interactiva

Herramienta educativa para exposición académica con 3 módulos interactivos:
**Anagramas · Palabras Concretas/Abstractas · Ábaco**

---

## 📁 Estructura del proyecto

```
mentaltech/
├── core/                        # Configuración Django
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── mindcraft/                   # App principal
│   ├── static/
│   │   ├── css/
│   │   │   └── layout.css       # Estilos globales
│   │   └── js/
│   │       ├── anagramas.js     # Lógica módulo 1
│   │       ├── palabras.js      # Lógica módulo 2
│   │       └── abaco.js         # Lógica módulo 3
│   ├── templates/
│   │   └── mindcraft/
│   │       ├── base.html        # Template base con navbar
│   │       ├── dashboard.html   # Página principal
│   │       ├── anagramas.html   # Módulo 1
│   │       ├── palabras.html    # Módulo 2
│   │       └── abaco.html       # Módulo 3
│   ├── views.py
│   ├── urls.py
│   └── apps.py
├── manage.py
├── requirements.txt
└── README.md
```

---

## 🚀 Instalación y ejecución

### 1. Clonar / copiar el proyecto
```bash
cd mentaltech
```

### 2. Crear entorno virtual
```bash
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 4. Ejecutar el servidor
```bash
python manage.py runserver
```

### 5. Abrir en el navegador
```
http://127.0.0.1:8000/
```

---

## 🧩 Módulos

| Módulo | Descripción |
|--------|-------------|
| 🔤 Anagramas | Reorganiza letras para formar nuevas palabras. Contador de aciertos. |
| 🧠 Palabras | Quiz: clasifica palabras en concretas o abstractas. Barra de progreso. |
| 🔢 Ábaco | Genera números aleatorios y ejercicios de suma para el ábaco físico. |

---

## ⚙️ Tecnologías

- **Backend:** Django 4.2 (sin base de datos)
- **Frontend:** HTML5 + CSS3 + JavaScript vanilla
- **Fuentes:** Syne + DM Sans (Google Fonts)
- **Sin dependencias externas de JS**
