# 🚀 Framework de Pruebas de Rendimiento y Carga con K6

![K6](https://img.shields.io/badge/k6-7D64FF.svg?style=for-the-badge&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![QA Automation](https://img.shields.io/badge/QA-Automation_Engineer-success?style=for-the-badge)

Este repositorio contiene un framework profesional y escalable para la automatización de pruebas de rendimiento (Performance Testing) utilizando **Grafana K6**. 

A diferencia de los scripts de prueba tradicionales (monolíticos), este proyecto está diseñado bajo una **arquitectura modular (API Object Model)**. Esto significa que el código está preparado para entornos reales: es fácil de mantener, los datos están separados de la lógica, y está listo para integrarse en pipelines de despliegue continuo (CI/CD).

---

## 🎯 ¿Qué resuelve este proyecto?
El objetivo de este framework es simular tráfico real de usuarios sobre una API para validar su estabilidad, tiempos de respuesta y límites de infraestructura antes de salir a producción. 

**Características principales implementadas:**
- **Modularidad (AOM):** La lógica de las peticiones HTTP está separada de los casos de prueba, facilitando el mantenimiento si las APIs cambian.
- **Data-Driven Testing (DDT):** Los datos de prueba no están quemados en el código. Se inyectan dinámicamente desde archivos JSON usando memoria compartida (`SharedArray`) para no sobrecargar el sistema.
- **Correlación de Datos:** Capacidad de extraer variables dinámicas de una respuesta (ej. un ID o un Token) e inyectarlas en la siguiente petición simulando flujos reales de usuario.
- **Preparado para CI/CD:** Uso de *Lifecycle Hooks* (`setup` y `teardown`) para inicializar/limpiar datos, y umbrales estrictos (*Thresholds* con `abortOnFail`) para detener un pipeline de inmediato si el servidor se degrada.
- **Reportes Visuales:** Generación automática de dashboards HTML interactivos al finalizar las pruebas para facilitar la lectura de métricas a los stakeholders.

---

## 📁 Estructura del Proyecto

El repositorio está organizado estratégicamente por responsabilidades:

```text
📦 k6-performance-framework
┣ 📂 docs/          # Documentación técnica detallada de cada script y módulo.
┣ 📂 src/
┃ ┣ 📂 config/      # Configuraciones globales y variables de entorno (URLs, ambientes).
┃ ┣ 📂 data/        # Archivos JSON/CSV con datos de prueba (Payloads).
┃ ┣ 📂 requests/    # Clases que construyen y ejecutan las peticiones HTTP (El "Cómo").
┃ ┣ 📂 scenarios/   # Casos de prueba ejecutables con perfiles de carga (El "Qué").
┃ ┗ 📂 utils/       # Funciones auxiliares y helpers reutilizables.
┣ 📜 .gitignore     # Archivos ignorados por el control de versiones.
┗ 📜 README.md      # Presentación y guía de uso del proyecto.
```

---

## ⚙️ Requisitos Previos

Para ejecutar este proyecto en tu máquina local, necesitas:
1. **K6 instalado:** Puedes seguir la [guía de instalación oficial](https://k6.io/docs/get-started/installation/).
2. **Git:** Para clonar el repositorio.
3. **Editor de código:** Recomendado Kiro, VS Code o IntelliJ.

---

## 🚀 Guía de Ejecución

Clona este repositorio en tu máquina local y navega hasta la carpeta del proyecto:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd k6-performance-framework
```

### 1. Ejecución Básica (Smoke Test)
Verifica que el sistema base responde correctamente bajo una carga mínima.
```bash
k6 run src/scenarios/get-users.test.js
```

### 2. Ejecución de Flujos Complejos (Correlación)
Simula un escenario donde el usuario extrae un ID dinámico del servidor y luego consulta datos basados en ese ID.
```bash
k6 run src/scenarios/correlation.test.js
```

### 3. Ejecución Dinámica para Pipelines (CI/CD)
En un entorno de integración continua, la carga puede variar. Puedes inyectar la cantidad de Usuarios Virtuales (VUS) y la duración directamente desde la terminal, sin modificar el código.
```bash
k6 run -e VUS=10 -e DURATION=30s src/scenarios/cicd-lifecycle.test.js
```

### 4. Generación de Reporte Ejecutivo (HTML)
Ejecuta la prueba y genera un archivo `reporte-k6.html` en la raíz del proyecto con gráficas interactivas y consolidados de la ejecución.
```bash
k6 run src/scenarios/reporting.test.js
```

---

## 👤 Autor

**JanSebastian**  
*QA Automation Engineer*  
Especialista en pruebas de software, automatización, análisis funcional y metodologías ágiles.