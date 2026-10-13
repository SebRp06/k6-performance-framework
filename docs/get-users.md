# Documentación de Pruebas: Smoke Test - Get Users

## 1. Descripción General
Este artefacto es un **Smoke Test** diseñado para verificar la disponibilidad y el correcto funcionamiento del endpoint de listado de usuarios de la API pública ReqRes. Su objetivo principal es asegurar que el servicio responde adecuadamente bajo una carga mínima antes de ejecutar pruebas de estrés más agresivas.

## 2. Detalles Técnicos
* **Endpoint:** `GET https://reqres.in/api/users?page=2`
* **Tipo de Prueba:** Smoke Test
* **Herramienta:** K6
* **Lenguaje:** JavaScript (ES6)

## 3. Configuración de Carga (Options)
La prueba está configurada para simular el comportamiento de un usuario único, validando la estabilidad base del sistema.
* **Usuarios Virtuales (VUs):** 1
* **Duración:** 5 segundos
* **Pacing (Think Time):** 1 segundo de pausa entre iteraciones para simular el tiempo de lectura de un usuario real.

## 4. Acuerdos de Nivel de Servicio (Thresholds)
Se establecieron los siguientes criterios de aceptación. Si alguno de estos no se cumple, la prueba se considerará fallida (útil para integración continua/CI):
* **Tasa de Error:** Menos del 1% de las peticiones pueden fallar (`http_req_failed < 0.01`).
* **Tiempo de Respuesta (p95):** El 95% de las solicitudes deben completarse en menos de 500 milisegundos (`http_req_duration < 500`).

## 5. Validaciones Funcionales (Checks)
Durante la ejecución, el script realiza aserciones sobre la respuesta HTTP para garantizar la integridad de los datos:
1. **Status Code:** Verifica que el código de respuesta HTTP sea `200 OK`.
2. **Paginación:** Valida que el cuerpo de la respuesta en formato JSON contenga el atributo `"page": 2`.
3. **Integridad de Datos:** Comprueba que el arreglo `"data"` (lista de usuarios) contenga al menos un registro, asegurando que la base de datos está retornando información.

## 6. Ejecución
Para ejecutar este escenario desde la terminal, utiliza el siguiente comando estando en la raíz del proyecto:

```bash
k6 run src/scenarios/get-users.test.js
```