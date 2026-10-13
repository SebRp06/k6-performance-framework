# Documentación de Escenario: Extracción y Correlación de Datos

## 1. Información General
- **Módulo:** `correlation.test.js`
- **Ubicación:** `src/scenarios/`
- **Descripción:** Escenario de pruebas que valida flujos transaccionales encadenados. Demuestra la capacidad de extraer valores dinámicos de una respuesta HTTP y utilizarlos en peticiones subsecuentes.

## 2. Flujo Transaccional
1. **Petición Inicial:** Se ejecuta `GET /users` para obtener el catálogo de usuarios.
2. **Extracción (Parsing):** Se convierte el body a un objeto JSON y se selecciona un elemento de manera pseudoaleatoria utilizando `Math.random()`.
3. **Inyección:** El `id` del usuario extraído se inyecta como Query Parameter en la siguiente petición.
4. **Petición Consecuente:** Se ejecuta `GET /posts?userId={id}`.

## 3. Validaciones y Trazabilidad
- Los `console.log` inyectados permiten visualizar en tiempo real qué usuario exacto extrajo cada Usuario Virtual (VU) y cómo este varía en cada iteración.
- Se implementó una aserción estricta que navega por el array devuelto en la segunda petición para asegurar que el `userId` de los posts coincida exactamente con el `id` extraído originalmente.