# DailyTrends API

## Descripción

DailyTrends es una API backend que expone un feed de noticias agregando las portadas de periódicos como **El País** y **El Mundo**. Permite tanto la extracción automática de noticias mediante web scraping como la creación manual de feeds a través de endpoints RESTful.

La aplicación sigue un enfoque basado en **Clean Architecture**, desacoplando las capas de dominio, aplicación e infraestructura para garantizar escalabilidad y mantenibilidad.

---

### **2. Arquitectura y Estructura del Proyecto**

La aplicación está organizada en las siguientes capas:

- **Domain Layer**: Contiene las entidades y lógica de negocio pura.
- **Application Layer**: Implementa los casos de uso y coordina la interacción entre capas.
- **Infrastructure Layer**: Gestiona la persistencia (MongoDB) y servicios externos (Puppeteer).
- **Interface Layer**: Controladores y rutas para exponer los endpoints HTTP.

#### Diagrama de Arquitectura

A continuación se muestra un diagrama que representa la estructura y las relaciones entre las diferentes capas del sistema:

+-----------------------------+
|         UI / API            |  <- Controladores y rutas HTTP
+-----------------------------+
|      Application Layer      |  <- Casos de uso (CreateFeedUseCase, ReadFeedsUseCase, etc.)
+-----------------------------+
|       Domain Layer          |  <- Entidad Feed, validaciones y lógica de negocio
+-----------------------------+
|    Infrastructure Layer     |  <- Repositorio MongoDB, servicio Puppeteer
+-----------------------------+

---

### **3. Endpoints Disponibles**

La API proporciona los siguientes endpoints CRUD para gestionar feeds de noticias:

| Método | Ruta              | Descripción                                     |
|--------|-------------------|-------------------------------------------------|
| `GET`  | `/feeds`          | Obtener todas las noticias almacenadas.         |
| `GET`  | `/feeds/:id`      | Obtener una noticia específica por su ID.       |
| `POST` | `/feeds`          | Crear una nueva noticia manualmente.           |
| `PUT`  | `/feeds/:id`      | Actualizar una noticia existente.               |
| `DELETE`| `/feeds/:id`    | Eliminar una noticia existente.                 |
| `POST` | `/scrape`         | Ejecutar el servicio de scraping para extraer noticias de portada. |

---

### **4. Tecnologías Utilizadas**

- **Lenguaje**: TypeScript
- **Framework**: Express.js
- **Base de Datos**: MongoDB (usando Mongoose como ODM)
- **Web Scraping**: Puppeteer
- **Pruebas**: Jest + Supertest
- **Patrón de Diseño**: Clean Architecture
- **Buenas Prácticas**: Validación de datos (Joi), manejo de errores centralizado, testing unitario e integración.

---

### **5. Instrucciones de Instalación**

#### Requisitos Previos:
- Node.js v18+
- npm o yarn
- MongoDB (puedes usar Docker o MongoDB Compass)

#### Pasos para Instalar:
1. Clona el repositorio:
   ```bash
   git clone https://github.com/faqundo/dailyTrendApi.git
   cd dailyTrendApi
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con las variables de entorno necesarias.
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/dailyTrends
4. Compila el proyecto:
   ```bash
   npm run build
   ```
5. Inicia el servidor:
   ```bash
   npm run dev
   ```  


dailyTrendApi/
├── application/                  # Capa de aplicación
│   ├── usecases/                 # Casos de uso
│   │   ├── CreateFeedUseCase.ts  # Crear un Feed manualmente
│   │   └── ReadFeedsUseCase.ts   # Leer feeds de portada (web scraping)
│   │
│   └── interfaces/               # Interfaces abstractas
│       ├── IFeedRepository.ts    # Contrato para el repositorio de Feeds
│       └── IScraperService.ts     # Contrato para el servicio de scraping
│
├── domain/                       # Capa de dominio
│   ├── entities/                 # Entidades del dominio
│   │   └── Feed.ts               # Modelo Feed con atributos y validaciones
│   │
│   └── exceptions/               # Excepciones de dominio
│       └── InvalidFeedError.ts   # Ejemplo: Excepción para feeds inválidos
│
├── infrastructure/               # Capa de infraestructura
│   ├── persistence/              # Implementaciones de persistencia
│   │   └── FeedRepository.ts     # Repositorio MongoDB para Feeds
│   │
│   ├── services/                 # Servicios externos
│   │   ├── ElPaisScraper.ts      # Scraper para El País
│   │   └── ElMundoScraper.ts     # Scraper para El Mundo
│   │
│   └── web/                      # Configuración del servidor
│       └── ExpressServer.ts      # Configuración de Express
│
├── interfaces/                   # Interfaces específicas (HTTP, CLI, etc.)
│   ├── http/                     # Interfaz HTTP
│   │   ├── controllers/          # Controladores
│   │   │   └── FeedController.ts # Controlador para endpoints de Feed
│   │   └── routes/               # Rutas
│   │       └── feedRoutes.ts     # Rutas relacionadas con Feed
│   │
│   └── cli/                      # Interfaz CLI (opcional)
│       └── SeedCommand.ts        # Ejemplo: Comando para sembrar datos iniciales
│
└── tests/                        # Pruebas
    ├── unit/                     # Pruebas unitarias
    │   ├── application/          # Pruebas para casos de uso
    │   │   ├── CreateFeedUseCase.test.ts
    │   │   └── ReadFeedsUseCase.test.ts
    │   └── domain/               # Pruebas para entidades
    │       └── FeedEntity.test.ts
    │
    └── integration/              # Pruebas de integración
        ├── controllers/          # Pruebas para controladores
        │   └── FeedController.test.ts
        └── infrastructure/       # Pruebas para repositorios y servicios
            └── FeedRepository.test.ts