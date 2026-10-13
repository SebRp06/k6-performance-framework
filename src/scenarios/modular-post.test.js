/**
 * @fileoverview Escenario modularizado con métricas personalizadas, logs en tiempo real
 * y selección de datos aleatoria (Data-Driven Testing Dinámico).
 * 
 * Documentación detallada:
 * ../../docs/modular-post.md
 */

import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Trend, Counter } from 'k6/metrics';
import { PostApi } from '../requests/post.requests.js';

// 1. Declaración de Custom Metrics
const postCreationTrend = new Trend('custom_post_creation_time');
const successfulPosts = new Counter('custom_successful_posts');

// 2. Carga de datos externos (Data-Driven eficiente)
const testData = new SharedArray('Datos de Posts', function () {
  return JSON.parse(open('../data/posts.json'));
});

// 3. Instancia del cliente API
const postApi = new PostApi();

export const options = {
  vus: 2,           // 2 Usuarios concurrentes
  duration: '10s',  // Ejecución corta para observar los logs
  thresholds: {
    'custom_post_creation_time': ['p(95)<1500'],
  },
};

export default function () {
  // 4. OPTIMIZACIÓN: Selección aleatoria de un objeto del arreglo
  // Calculamos un índice al azar basado en la longitud total del JSON cargado
  const randomIndex = Math.floor(Math.random() * testData.length);
  const data = testData[randomIndex];

  // LOG EN TIEMPO REAL
  console.log(`[VU: ${__VU} | Iter: ${__ITER}] 🚀 Iniciando petición POST para el título: "${data.title}"...`);

  // Ejecución de la petición
  const response = postApi.createPost(data);

  // Alimentamos la métrica Trend
  postCreationTrend.add(response.timings.duration);

  // Validación y Log de Respuesta
  if (response.status === 201) {
    successfulPosts.add(1); // Incrementamos el contador de éxitos
    console.log(`[VU: ${__VU} | Iter: ${__ITER}] ✅ ÉXITO - Creado con ID: ${response.json('id')} en ${response.timings.duration}ms`);
  } else {
    console.error(`[VU: ${__VU} | Iter: ${__ITER}] ❌ FALLO - Código HTTP: ${response.status}`);
  }

  check(response, {
    'código de respuesta es 201': (r) => r.status === 201,
  });

  // Pacing
  sleep(1);
}