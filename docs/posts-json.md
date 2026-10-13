# Documentación de Arquitectura: Gestión de Datos (Data-Driven)

## 1. Información del Módulo
- **Archivo:** `src/data/posts.json`
- **Propósito:** Almacenar los payloads (cuerpos de petición) separando la capa de datos de la lógica de ejecución, permitiendo selecciones aleatorias durante la prueba.

## 2. Descripción Arquitectónica
Este archivo JSON representa la implementación del patrón **Data-Driven Testing (DDT)** en el framework. Contiene un arreglo de múltiples objetos que estructuran la información para la creación de recursos (POST), simulando diferentes intenciones de usuario (ej. Spike Testing, Stress Testing).

## 3. Estructura del Payload
El archivo contiene una lista de 5 objetos distintos, cada uno con la siguiente estructura requerida por el backend:
- `title` (String): Título temático del registro (usado para logs en tiempo real).
- `body` (String): Contenido principal del registro y propósito de la prueba.
- `userId` (Integer): Identificador único del usuario creador (1-5).

## 4. Integración Dinámica con K6 (`SharedArray`)
El framework carga este archivo utilizando el módulo `SharedArray` de `k6/data` para optimizar la memoria. Adicionalmente, el motor de ejecución selecciona un índice al azar (`Math.random()`) de este arreglo en cada iteración, garantizando:
- Prevención de caché en balanceadores de carga.
- Variabilidad de datos similar a un entorno de producción real.