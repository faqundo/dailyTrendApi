module.exports = {
    preset: 'ts-jest', // Soporte para TypeScript
    testEnvironment: 'node', // Entorno Node.js
    roots: ['<rootDir>/src/tests'], // Carpeta donde se encuentran las pruebas
    setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'], // Agregar el setup aquí
    collectCoverage: true, // Habilitar cobertura de código
    coverageDirectory: 'coverage', // Directorio para los informes de cobertura
    coverageProvider: 'v8', // Usar el motor V8 para calcular la cobertura
};