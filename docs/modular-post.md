# Documentación de Escenario: Creación de Post (Modular & Custom Metrics)

## 1. Información General
- **Módulo:** `modular-post.test.js`
- **Arquitectura:** API Object Model (AOM).
- **Dependencias:** `src/requests/post.requests.js`, `src/config/environments.js`, `src/data/posts.json`.
- **Descripción:** Escenario refactorizado que desacopla la lógica de red, implementa telemetría en tiempo real y ejecuta selección dinámica (aleatoria) de payloads para simular comportamiento humano realista.

## 2. Gestión de Datos Dinámica (Aleatoriedad)
El escenario utiliza `SharedArray` para cargar el payload desde `posts.json` en memoria de forma optimizada. 

**Optimización de Iteración:**
En lugar de procesar los datos de manera secuencial o enviar siempre el primer elemento, el script utiliza `Math.random()` para seleccionar dinámicamente un índice aleatorio del arreglo en cada iteración de cada Usuario Virtual (VU). 
*Beneficios de este enfoque:*
- Evita el almacenamiento en caché de peticiones idénticas a nivel de servidor o WAF.
- Permite descubrir errores de borde en estructuras de datos específicas (Edge Cases).
- Representa de manera fidedigna la variabilidad de los datos en un entorno productivo.

## 3. Métricas Personalizadas (Custom Metrics)
- **`custom_post_creation_time` (Trend):** Mide exclusivamente el tiempo de transacción de la creación del post. **Threshold:** `p(95) < 1500ms`.
- **`custom_successful_posts` (Counter):** Contabiliza de forma neta cuántos registros se insertaron correctamente (Status 201).

## 4. Trazabilidad Sincrónica
Se inyectan logs estructurados en consola mediante `console.log()` combinando las variables de contexto `__VU` e `__ITER`. Esto facilita el debugging al mostrar el título del payload elegido aleatoriamente y el tiempo exacto que tomó su resolución.