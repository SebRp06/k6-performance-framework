/**
 * @fileoverview Smoke Test para validar el endpoint GET /users de ReqRes.
 * @module GetUsersScenario
 * 
 * Documentación detallada:
   ./docs/get-users.md
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Configuración de ejecución (Options)
export const options = {
  vus: 1,            // 1 Usuario Virtual (VU)
  duration: '5s',    // Ejecutar durante 5 segundos
  thresholds: {
    http_req_failed: ['rate<0.01'],         // Menos del 1% de errores
    http_req_duration: ['p(95)<500'],       // El 95% de las peticiones deben responder en menos de 500ms
  },
};

// 2. Función por defecto (Ciclo de vida del VU)
export default function () {
  const url = 'https://reqres.in/api/users?page=2';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.get(url, params);

  // 3. Validaciones funcionales básicas (Checks)
  check(response, {
    'código de respuesta es 200': (r) => r.status === 200,
    'retorna página 2': (r) => r.json('page') === 2,
    'lista de usuarios no vacía': (r) => r.json('data').length > 0,
  });

  // Pausa simulada entre acciones del usuario (Pacing / Think Time)
  sleep(1);
}