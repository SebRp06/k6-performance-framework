# Documentación de Arquitectura: Configuración de Entornos

## 1. Información del Módulo
- **Archivo:** `src/config/environments.js`
- **Propósito:** Centralizar la gestión de variables de entorno y URLs base del framework.

## 2. Descripción Arquitectónica
Este módulo actúa como la única fuente de verdad (Single Source of Truth) para las configuraciones globales del proyecto. En lugar de tener URLs quemadas (hardcoded) en múltiples scripts de prueba, todos los clientes API importan la configuración desde este archivo.

## 3. Implementación de Variables Dinámicas
El módulo utiliza el objeto global `__ENV` proporcionado nativamente por K6. Esto permite modificar el comportamiento del script en tiempo de ejecución sin alterar el código fuente.

**Mapeo actual:**
- `BASE_URL`: Define la ruta principal de la API. Por defecto apunta a `https://jsonplaceholder.typicode.com`.

**Ejemplo de uso en CI/CD:**
Para ejecutar las pruebas apuntando a un entorno de Desarrollo o QA, se inyecta la variable desde la línea de comandos:
`k6 run -e BASE_URL=https://qa.api.midominio.com src/scenarios/modular-post.test.js`

## 4. Beneficios
- **Escalabilidad:** Facilita la transición entre entornos (Dev, QA, Staging, Prod).
- **Mantenibilidad:** Si la URL cambia, solo se modifica una línea de código en todo el framework.