# Documentación del API Client: User Requests

## 1. Información General
- **Módulo:** `user.requests.js`
- **Ubicación:** `src/requests/`
- **Descripción:** Clase orientada a objetos (AOM) que centraliza las peticiones relacionadas con la entidad *Users*.

## 2. Métodos Disponibles
### `getAllUsers()`
- **Método HTTP:** `GET`
- **Endpoint:** `/users`
- **Propósito:** Retorna la colección completa de usuarios registrados en el sistema. Utilizado principalmente como paso previo para extracción de variables dinámicas (Correlación).

### `getUserPosts(userId)`
- **Método HTTP:** `GET`
- **Endpoint:** `/posts?userId={userId}`
- **Parámetros:** 
  - `userId` (Integer): Identificador único del usuario.
- **Propósito:** Retorna los posts asociados exclusivamente a un ID específico.