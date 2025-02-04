dailyTrendApi/
├── domain/                # Capa de dominio (entidades y casos de uso)
│   ├── entities/
│   │   └── feed.entity.ts
│   └── useCases/
│       └── feed.useCase.ts
├── application/           # Capa de aplicación (controladores y adaptadores)
│   ├── controllers/
│   │   └── feed.controller.ts
│   └── adapters/
│       └── feed.adapter.ts
├── infrastructure/        # Capa de infraestructura (repositorios, servicios externos)
│   ├── repositories/
│   │   └── feed.repository.ts
│   └── services/
│       └── feed.scraper.service.ts
├── utils/                 # Utilidades compartidas
├── app.ts                 # Configuración principal de la aplicación
└── server.ts              # Inicialización del servidor