# Documentación de Escenario: Pipeline CI/CD & Lifecycle Hooks

## 1. Información General
- **Módulo:** `cicd-lifecycle.test.js`
- **Ubicación:** `src/scenarios/`
- **Descripción:** Escenario avanzado diseñado para integrarse en pipelines de Integración Continua. Incorpora el control de las etapas de inicialización y finalización, además de sobrescritura de carga mediante CLI.

## 2. Inyección de Variables de Entorno (CLI Overrides)
El script no posee valores duros de carga. Su capacidad se define dinámicamente mediante el objeto `__ENV`.
- **`VUS`:** Controla los hilos concurrentes (por defecto 2).
- **`DURATION`:** Controla la ventana de tiempo de ejecución (por defecto 10s).
- **Ejemplo de ejecución en Pipeline:** `k6 run -e VUS=10 -e DURATION=30s src/scenarios/cicd-lifecycle.test.js`

## 3. Ciclo de Vida (Hooks)
La arquitectura del script separa la lógica de negocio en tres fases:
1. **`setup()`:** Fase preparatoria exclusiva (ejecución única). Levanta configuraciones iniciales, consulta bases de datos o genera tokens de autorización. Retorna un objeto compartido.
2. **`default(data)`:** Función iterativa principal. Recibe en memoria el objeto generado por el setup, evitando redundancia de consultas y ahorrando recursos de red.
3. **`teardown(data)`:** Fase de cierre (ejecución única tras detenerse todos los VUs). Se utiliza para ejecutar borrados en cascada en la base de datos o cerrar sockets abiertos.

## 4. Estrategia Fail-Fast (AbortOnFail)
En lugar de esperar a que termine toda la prueba para determinar un fallo, el umbral de `http_req_duration` incorpora la propiedad `abortOnFail: true`. Si la degradación del servicio sobrepasa los 2 segundos, el agente de K6 aborta instantáneamente la prueba para liberar agentes del pipeline.