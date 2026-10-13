# Documentación de Arquitectura: Cliente API (API Object Model)

## 1. Información del Módulo
- **Archivo:** `src/requests/post.requests.js`
- **Propósito:** Encapsular la lógica de interacción HTTP (peticiones y cabeceras) para un dominio específico.

## 2. Descripción Arquitectónica
Este archivo implementa un patrón de diseño análogo al Page Object Model (POM), conocido en pruebas de backend como **API Object Model (AOM)**. 
Toda la complejidad sobre *cómo* se realiza una petición de red se esconde detrás de los métodos de una clase, exponiendo una interfaz limpia a los scripts de los escenarios.

## 3. Composición de la Clase `PostApi`
- **Constructor:** Se inicializa obteniendo la `BASE_URL` centralizada desde `environments.js` y define los `headers` estándar (ej. `Content-Type: application/json`).
- **Método `createPost(payload)`:** 
  - Recibe dinámicamente un objeto de datos.
  - Construye el endpoint completo (`/posts`).
  - Serializa el payload utilizando `JSON.stringify()`.
  - Retorna el objeto HTTP Response nativo de K6 para que el escenario principal pueda realizar las aserciones (`checks`) y extraer métricas.

## 4. Beneficios
- **Reusabilidad:** Cualquier nuevo escenario (ej. una prueba de estrés masiva o un spike test) puede importar e instanciar `PostApi` sin reescribir la lógica HTTP.
- **Separación de Responsabilidades (SoC):** El escenario se preocupa por *cuánto* y *qué* validar, mientras que esta clase se preocupa por *cómo* comunicarse con el servidor.