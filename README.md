dailyTrendApi/
│
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