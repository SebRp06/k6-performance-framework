
# Documentación de Escenario: Creación de Registro (POST)

## 1. Información General
- **Módulo:** `create-post.test.js`
- **Descripción:** Escenario de carga con Ramping VUs para validar el comportamiento del servidor al inyectar nuevos registros (payloads JSON).
- **API Target:** `https://jsonplaceholder.typicode.com/posts`
- **Método HTTP:** `POST`

## 2. Perfil de Carga (Load Profile)
El escenario utiliza un modelo de carga por etapas (Ramping VUs) distribuido en 20 segundos de ejecución total:
1. **Ramp-up:** Incremento gradual de 0 a 5 usuarios virtuales (VUs) durante 5 segundos.
2. **Steady state:** Mantenimiento de la carga de 5 VUs concurrentes durante 10 segundos.
3. **Ramp-down:** Descenso gradual de 5 a 0 VUs durante 5 segundos.

## 3. Criterios de Aceptación (Thresholds)
- `http_req_duration`: El 95% de las peticiones (`p(95)`) deben resolverse en menos de **1500 milisegundos**.
- `http_req_failed`: La tasa de error (HTTP 4xx o 5xx) debe ser menor al **5%**.

## 4. Validaciones Funcionales (Checks)
- Código de respuesta HTTP esperado: `201 Created`.
- El cuerpo de la respuesta contiene un campo `id` autogenerado.
- El título del post devuelto por el servidor coincide exactamente con la cadena `'Automatización K6'` enviada en el payload.