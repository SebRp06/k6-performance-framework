/**
 * @fileoverview Escenario de Correlación de Datos.
 * 
 * Documentación detallada:
 * ../../docs/correlation.md
 */

import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { UserApi } from '../requests/user.requests.js';

// Custom metric para medir solo la carga de los posts filtrados
const postsLoadTrend = new Trend('custom_posts_load_time');
const userApi = new UserApi();

export const options = {
  vus: 2,
  duration: '10s',
  thresholds: {
    'custom_posts_load_time': ['p(95)<1500'],
  },
};

export default function () {
  // PASO 1: Ejecutar la primera petición (Obtener usuarios)
  const usersResponse = userApi.getAllUsers();
  check(usersResponse, {
    'GET usuarios - status 200': (r) => r.status === 200,
  });

  // PASO 2: Extracción y Correlación
  const users = usersResponse.json();
  const randomUser = users[Math.floor(Math.random() * users.length)]; // Selecciona uno al azar
  
  console.log(`[VU: ${__VU} | Iter: ${__ITER}] 🔍 Usuario extraído: ${randomUser.name} (ID: ${randomUser.id})`);

  // PASO 3: Inyectar el dato extraído en la segunda petición
  const postsResponse = userApi.getUserPosts(randomUser.id);
  postsLoadTrend.add(postsResponse.timings.duration);

  // PASO 4: Validar que el servidor devolvió la información correcta
  check(postsResponse, {
    'GET posts filtrados - status 200': (r) => r.status === 200,
    'Posts pertenecen al usuario extraído': (r) => r.json()[0].userId === randomUser.id,
  });

  console.log(`[VU: ${__VU} | Iter: ${__ITER}] ✅ ÉXITO - Obtenidos ${postsResponse.json().length} posts para el ID: ${randomUser.id}`);
  
  sleep(1);
}