# Comparación de Productos

## Propósito README

El contenido del README expone el doumento de plan de proyecto de la API, compuesto por: la definición del proyecto, las diversas decisiones arquitectónicas utilizadas para implementar el proyecto, las tecnologías principales utilizadas, la estructura del proyecto, cómo utilizar los endpoints de la API y cómo ejecutar las pruebas unitarias y cómo la GenAI y los agentes ayudaron en el desarrollo del proyecto.

## Definición del Proyecto

API RESTful con devolución de datos para la comparación de productos, desarrollada con Node.js y Express, siguiendo el patrón de arquitectura MVC (Modelo-Vista-Controlador) donde se implementan las rutas, controladores, modelos y validaciones.
Los modelos se encargan de la persistencia de los datos en un archivo JSON.
Los controladores se encargan de la lógica de negocio.
Las rutas se encargan de la definición de los endpoints.
Los middlewares se encargan del manejo de errores (errorHandler middlware) y validaciones de datos (validateProduct middleware).

## Decisiones Arquitectónicas

- Se implementó el patrón de arquitectura MVC (Modelo-Vista-Controlador) para separar la lógica de la exposición de rutas, de la lógica de negocio y persistencia, donde cada una tiene su propia responsabilidad. Además, permite la escalabilidad de la API, ya que en caso de querer migrarse a bases de datos, lo único que se debería cambiar es el modelo específico, sin tener que cambiar la lógica de negocio (controllers) o cómo se exponen los endpoints (routes).
- Se hizo uso del manejo de errores con el middleware personalizado para manejar errores de forma centralizada y evitar interrupciones de la API y el manejo propio de los mismos en cada controlador (buena práctica).
- Se decidio validar los datos con Joi para los datos de entrada, evitando validar manualmente en código cada entrada (buena práctica).
- Se implementó la persistencia de datos en un archivo JSON.
- Se implementó el manejo de variables de entorno con dotenv para que al subir el archivo a repositorio, no se expongan configuraciones relativas al entorno (buena práctica) y crossenv para que funcione en diferentes sistemas operativos y para no exponer las configuraciones relativas al entorno (buena práctica).

## Tecnologías Principales/Stack

- **Node.js**: Entorno de ejecución de JavaScript
- **Express**: Framework web para Node.js
- **Joi**: Validación de datos
- **CORS**: Middleware para habilitar CORS
- **Jest**: Framework de pruebas unitarias
- **Supertest**: Librería para pruebas de integración HTTP
- **dotenv**: Manejo de variables de entorno
- **crossenv**: Manejo de variables de entorno en diferentes sistemas operativos, ya que en Windows y en IOS se pueden setear de diferentes formas.

## Estructura del Proyecto (MVC)

```
src/
├── config/         # Configuraciones de la aplicación
├── controllers/    # Lógica de controladores / Lógica de negocio
├── middlewares/    # Middlewares personalizados con validacion y manejo de errores
├── models/         # Modelos de datos / Persistencia de datos
├── routes/         # Definición de rutas / Endpoints
├── schemas/        # Esquemas de validación con Joi
├── tests/          # Pruebas unitarias
└── utils/          # Utilidades y helpers
```

## Variables de Entorno

Se crea un archivo `.env.development` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
NODE_ENV=development
```

## Documentación de EndPoints de la API

### Puertos Utilizados

- **3000**: Puerto de desarrollo -> http://localhost:3000/api

### EndPoints

### Health Check (/health) -> http://localhost:3000/api/health (EN DESARROLLO)

#### Obtener estado de la API
```http
GET /api/health
```

**Respuesta exitosa (200 OK):**
```json
{
  "status": "ok"
}
```

### Productos (/productos) -> http://localhost:3000/api/productos (EN DESARROLLO)

#### Obtener todos los productos para la comparación
```http
GET /api/productos?nombre=string&precioMin=number&precioMax=number&calificacionMin=number&calificacionMax=number&orderBy=string&orden=string
```

**Parámetros de consulta:**
- `nombre` (opcional): Nombre del producto
- `precioMin` (opcional): Precio mínimo
- `precioMax` (opcional): Precio máximo
- `calificacionMin` (opcional): Calificación mínima
- `calificacionMax` (opcional): Calificación máxima
- `orderBy` (opcional): Propiedad por la que ordenar (precio, calificacion) -> debe ser una propiedad del producto
- `orden` (opcional): Orden (asc, desc) -> debe ser asc o desc, en caso de ingresar otro valor se ordena de forma ascendente

**Respuesta exitosa (200 OK):**
```json
[
  {
    "id": "1",
    "nombre": "Producto Ejemplo",
    "descripcion": "Descripción del producto",
    "precio": 999.99,
    "calificacion": 4.5,
    "especificaciones": {
      "marca": "Marca Ejemplo",
      "modelo": "Modelo 2023",
      "color": "Negro"
    }
  }
]
```

**Errores:**
- `400 Bad Request`: Si los parámetros de consulta no son válidos para el ordenamiento

#### Obtener un producto por ID
```http
GET /api/productos/:id
```

**Parámetros de ruta:**
- `id` (requerido): ID del producto

**Respuesta exitosa (200 OK):**
```json
{
  "id": "1",
  "nombre": "Producto Ejemplo",
  "descripcion": "Descripción del producto",
  "precio": 999.99,
  "calificacion": 4.5,
  "especificaciones": {
    "marca": "Marca Ejemplo",
    "modelo": "Modelo 2023",
    "color": "Negro"
  }
}
```

**Errores:**
- `404 Not Found`: Si el producto no existe

#### Crear un nuevo producto
```http
POST /api/productos
```

**Cuerpo de la solicitud (application/json):**
```json
{
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción del nuevo producto",
  "precio": 799.99,
  "calificacion": 4.0,
  "especificaciones": {
    "marca": "Otra Marca",
    "modelo": "Modelo 2023",
    "color": "Azul"
  }
}
```

**Respuesta exitosa (201 Created):**
```json
{
  "id": "2",
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción del nuevo producto",
  "precio": 799.99,
  "calificacion": 4.0,
  "especificaciones": {
    "marca": "Otra Marca",
    "modelo": "Modelo 2023",
    "color": "Azul"
  }
}
```

**Errores:**
- `400 Bad Request`: Si los datos del producto no son válidos

#### Actualizar un producto existente
```http
PUT /api/productos/:id
```

**Parámetros de ruta:**
- `id` (requerido): ID del producto a actualizar

**Cuerpo de la solicitud (application/json):**
```json
{
  "nombre": "Producto Actualizado",
  "precio": 899.99,
  "calificacion": 4.2
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": "1",
  "nombre": "Producto Actualizado",
  "descripcion": "Descripción del producto",
  "precio": 899.99,
  "calificacion": 4.2,
  "especificaciones": {
    "marca": "Marca Ejemplo",
    "modelo": "Modelo 2023",
    "color": "Negro"
  }
}
```

**Errores:**
- `400 Bad Request`: Si los datos del producto no son válidos
- `404 Not Found`: Si el producto no existe

### Códigos de estado HTTP

- `200 OK`: La solicitud se completó exitosamente
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: La solicitud es incorrecta o inválida
- `404 Not Found`: El recurso solicitado no existe
- `500 Internal Server Error`: Error interno del servidor

## Utilización de GenAI para mejorar eficiencia

- El proyecto incluye la utilización del IDE con agente integrado de Windsurf para aumentar la eficiencia en la generación del código de la API mediante el texto predictivo a medida que se iba escribiendo código, la generación inicial del README.md basado en los prompts. Además, se le solicito que completara los test automáticos definidos en productos.test.mjs siguiendo los ejemplos de pruebas definidas para POST/PUT/DELETE previos en test.http y productos.test.mjs (se tuvo que corregir código creado para test/supertest por el agente).
- Se utilizo el LLM de OpenAI ChatGPT para la generación de datos de purbea y para realizar consultas de cómo utilizar correctamente los módulos core de Node.js de fs (file system) y path, para leer y escribir en un archivo, cómo personalizar el mensaje de error que viene por defecto en joi y cómo identar correctamente en el archivo.json al guardar los productos ya que no recordaba como hacerlo correctamente. También, para consultar si era correcta la decisión arquitectónica de ir por un MVC teniendo que guardar los archivos en un archivo JSON y no en DB.
- Para ver los prompts, dirigirse al archivo prompts.md.

## Pruebas

El proyecto incluye pruebas unitarias automáticas utilizando Jest y Supertest. Para ejecutarlas:

```bash
npm test
```
