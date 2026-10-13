# Documentación de Escenario: Generación de Reporte HTML

## 1. Información General
- **Módulo:** `reporting.test.js`
- **Ubicación:** `src/scenarios/`
- **Arquitectura:** API Object Model (AOM) + Data-Driven Testing (DDT)
- **Dependencias:** `src/requests/post.requests.js`, `src/data/posts.json`
- **Descripción:** Escenario integral que une la arquitectura modular del framework con el hook `handleSummary` para transformar los resultados crudos en un Dashboard web visual e interactivo.

## 2. El Hook `handleSummary`
En la arquitectura de K6, `handleSummary(data)` es una función de ciclo de vida que se invoca de forma automática al finalizar todas las iteraciones. Recibe un objeto JSON (`data`) con todas las métricas de la prueba. Al retornar un objeto llave-valor (`'reporte-k6.html': htmlReport(data)`), el motor escribe el resultado procesado en el disco local.

## 3. Integración Modular
El script mantiene las mejores prácticas de automatización:
- **Desacoplamiento:** Utiliza la clase `PostApi` para la ejecución HTTP, aislando la lógica de red.
- **Datos Dinámicos:** Emplea `SharedArray` para inyectar payloads variados y evitar el uso de caché del servidor, enviando un título aleatorio por cada request.
- **Librería Externa:** Utiliza `k6-reporter` importado directamente mediante ES6 Modules desde GitHub (`https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js`).

## 4. Contenido del Dashboard
El artefacto resultante (`reporte-k6.html`) consolida el esfuerzo de la automatización en una vista ejecutiva interactiva:
- Porcentaje global de éxito/fracaso de Umbrales (Thresholds) y Aserciones (Checks).
- Gráficos de distribución de tiempos de respuesta (Percentiles, promedios y máximos).
- Volumetría de transacciones y consumo de ancho de banda.