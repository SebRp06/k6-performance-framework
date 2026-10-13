# 🚀 K6 Performance Testing Framework

Framework modular de pruebas de rendimiento y carga desarrollado con **K6** y **JavaScript (ES6+)**. Diseñado bajo el patrón API Object Model (AOM) para asegurar escalabilidad, fácil mantenimiento y ejecución en entornos de Integración Continua (CI/CD).

## 🛠️ Arquitectura y Tecnologías
- **Herramienta Core:** K6
- **Lenguaje:** JavaScript
- **Patrón de Diseño:** API Object Model (similar a POM pero para APIs)
- **Data-Driven Testing (DDT):** Inyección de payloads dinámicos mediante `SharedArray` para optimización de memoria.
- **Reporting:** Generación de dashboards HTML interactivos integrando `k6-reporter`.

## 📁 Estructura del Proyecto
El framework está separado por responsabilidades:
- `/src/config/`: Gestión de entornos y variables globales.
- `/src/data/`: Archivos JSON para parametrización de pruebas.
- `/src/requests/`: Clases que encapsulan la lógica HTTP por dominio.
- `/src/scenarios/`: Casos de prueba ejecutables (Smoke, Load, Stress, Correlación).
- `/docs/`: Documentación técnica detallada de cada artefacto y módulo.

## 🚀 Cómo ejecutar las pruebas

1. Instalar K6 en el sistema operativo.
2. Clonar este repositorio.
3. Ejecutar los escenarios desde la terminal.

**Ejecución básica (Smoke Test):**
\`\`\`bash
k6 run src/scenarios/get-users.test.js
\`\`\`

**Ejecución modular con reporte HTML interactivo:**
\`\`\`bash
k6 run src/scenarios/reporting.test.js
\`\`\`

**Ejecución simulando pipeline CI/CD (Sobrescribiendo variables):**
\`\`\`bash
k6 run -e VUS=10 -e DURATION=30s src/scenarios/cicd-lifecycle.test.js
\`\`\`