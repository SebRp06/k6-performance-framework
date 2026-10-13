/**
 * @fileoverview Escenario de carga para la creación de registros (POST) en JSONPlaceholder.
 * 
 * Documentación detallada:
 * ../../docs/create-post.md
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Configuración de ejecución con Ramping VUs (Stages)
export const options = {
  stages: [
    { duration: '5s', target: 5 },  
    { duration: '10s', target: 5 }, 
    { duration: '5s', target: 0 },  
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],      // Límite ajustado para la latencia de JSONPlaceholder
    http_req_failed: ['rate<0.05'],         // Máximo 5% de error permitido
  },
};

export default function () {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  // 2. Definición del Payload (Estructura requerida por JSONPlaceholder)
  const payload = JSON.stringify({
    title: 'Automatización K6',
    body: 'Prueba de carga ejecutada por JanSebastian - QA Automation Engineer',
    userId: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 3. Ejecución de la petición POST
  const response = http.post(url, payload, params);

  // 4. Validaciones
  check(response, {
    'código de respuesta es 201': (r) => r.status === 201,
    'se creó el recurso (contiene id)': (r) => r.json('id') !== undefined,
    'el título devuelto es correcto': (r) => r.json('title') === 'Automatización K6',
  });

  sleep(1);
}