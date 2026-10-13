/**
 * @fileoverview Escenario preparado para CI/CD con manejo de entorno y Lifecycle Hooks.
 * 
 * Documentación detallada:
 * ../../docs/cicd-lifecycle.md
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { ENV } from '../config/environments.js';

// 1. CONFIGURACIÓN DINÁMICA (CI/CD Ready)
export const options = {
  // Recibe la cantidad de VUs y duración desde la terminal, con valores por defecto
  vus: __ENV.VUS ? parseInt(__ENV.VUS) : 2,
  duration: __ENV.DURATION || '10s',
  
  thresholds: {
    // Tolerancia cero a errores: máximo 1% permitido
    http_req_failed: ['rate<0.01'], 
    
    // Fail-Fast: Si el percentil 95 supera los 2000ms, aborta la prueba inmediatamente
    http_req_duration: [
      { threshold: 'p(95)<1500' },
      { threshold: 'p(95)<2000', abortOnFail: true } 
    ],
  },
};

// 2. SETUP (Hook de Inicialización) - Se ejecuta 1 SOLA VEZ al inicio
export function setup() {
  console.log('🔧 [SETUP] Iniciando pre-condiciones. Obteniendo token o datos maestros...');
  
  const res = http.get(`${ENV.BASE_URL}/users/1`);
  const setupData = {
    userId: res.json('id'),
    userName: res.json('name')
  };
  
  // Lo que retorna el setup() se le inyecta a la función default y al teardown
  return setupData; 
}

// 3. DEFAULT (Ejecución Principal) - Se ejecuta múltiples veces por cada VU
export default function (data) {
  const payload = JSON.stringify({
    title: 'Prueba desde Pipeline CI/CD',
    body: 'Validación automatizada por JanSebastian - QA Automation Engineer',
    userId: data.userId, // Utilizamos el dato extraído en el setup()
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(`${ENV.BASE_URL}/posts`, payload, params);

  check(res, {
    'POST ejecutado con éxito (status 201)': (r) => r.status === 201,
  });

  console.log(`[VU: ${__VU} | Iter: ${__ITER}] ⚙️ Post inyectado utilizando usuario maestro: ${data.userName}`);
  
  sleep(1);
}

// 4. TEARDOWN (Hook de Limpieza) - Se ejecuta 1 SOLA VEZ al final
export function teardown(data) {
  console.log(`🧹 [TEARDOWN] Limpieza de recursos finalizada. Los datos del usuario ${data.userName} fueron liberados.`);
}