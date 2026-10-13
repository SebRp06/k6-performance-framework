/**
 * @fileoverview Escenario final modularizado con generación de Reporte HTML interactivo.
 * 
 * Documentación detallada:
 * ../../docs/html-reporting.md
 */

import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { PostApi } from '../requests/post.requests.js';

// Importación remota de la librería para el Dashboard (k6-reporter)
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// 1. Carga de datos externos compartidos
const testData = new SharedArray('Datos de Posts', function () {
  return JSON.parse(open('../data/posts.json'));
});

// 2. Instancia del cliente API
const postApi = new PostApi();

export const options = {
  vus: 3,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<1500'],
  },
};

export default function () {
  // Selección de datos dinámicos
  const randomData = testData[Math.floor(Math.random() * testData.length)];
  
  // 3. Ejecución de la petición a través del patrón AOM
  const response = postApi.createPost(randomData);
  
  check(response, {
    'status es 201': (r) => r.status === 201,
  });
  
  sleep(1);
}

// 4. Hook de Resumen (Se ejecuta al final de la prueba)
export function handleSummary(data) {
  console.log('📊 Finalizó la prueba modular. Generando reporte HTML interactivo...');
  
  return {
    // Escribe el archivo HTML en la raíz del proyecto
    'reporte-k6.html': htmlReport(data),
  };
}