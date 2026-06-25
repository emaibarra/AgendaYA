import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Le indica a Next.js dónde está la raíz del proyecto para cargar .env y next.config
  dir: './',
});

// Configuración personalizada para Jest
const config = {
  // Simula un entorno de navegador por si luego quieres testear componentes de React
  // testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  testEnvironment: 'node',
};

// Exportar la configuración para que Jest la use
export default createJestConfig(config);
