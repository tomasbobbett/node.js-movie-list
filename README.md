<h1>🎬 Movie API</h1>

API REST básica para gestionar una colección de películas usando Node.js y Express.

Incluye operaciones CRUD (Create, Read, Update, Delete), validación de datos con Zod, y ejemplos de datos en movies.json.

<h2>🚀 Características</h2>
<ul>
  <li>Listar todas las películas o filtrarlas por género.</li>
  <li>Obtener información detallada de una película por su ID.</li>
  <li>Crear nuevas películas con validación de datos.</li>
  <li>Actualizar parcialmente películas existentes.</li>
  <li>Eliminar películas por ID.</li>
  <li>Manejo de CORS para orígenes confiables.</li>
</ul>

<h2>📂 Estructura del proyecto</h2>

├── app.js            # Servidor principal con rutas y lógica de la API

├── movies.json       # Base de datos en formato JSON con películas de ejemplo

├── package.json      # Dependencias y scripts de npm

├── package-lock.json # Detalles de dependencias instaladas

├── api.http          # Ejemplos de requests para probar la API

└── schemes/
  ──> movies.js     

<h2>🛠️ Tecnologías</h2>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>Zod (para validación de esquemas)</li>
  <li>Nodemon (para desarrollo)</li>
</ul>

<h2>📦 Instalación</h2>

 Clona el repositorio e instala las dependencias:

    git clone https://github.com/tuusuario/tu-repo.git
    cd tu-repo
    npm install

<h2>▶️ Uso</h2>

Ejecuta el servidor en modo desarrollo:

    npm run dev


El servidor se iniciará en:

http://localhost:1234/

<h2>📌 Endpoints</h2>
<ul>
  <li>Obtener todas las películas</li>
  
    GET /movies

<li>Obtener todas las películas filtrando por genero</li>

    GET /movies?genre=Drama

<li>Obtener pelicula por ID</li>

    GET /movies/:id

<li>Crear una nueva pelicula</li>

    POST /movies
    Content-Type: application/json

    {
      "title": "Nueva Película",
      "year": 2024,
      "director": "Tu Nombre",
      "duration": 120,
      "poster": "https://poster.url",
      "genre": ["Acción"],
      "rate": 8.5
    }

<li>Actualizar parcialmente una película</li>

    PATCH /movies/:id
    Content-Type: application/json
    
    {
      "rate": 9.0
    }

<li>Eliminar una película</li>

    DELETE /movies/:id

<h2>🧪 Probar la API</h2>
Puedes usar el archivo api.http con extensiones como REST Client en VS Code o Postman/Insomnia.

<h2>📜 Licencia</h2>
Este proyecto está bajo licencia ISC.
