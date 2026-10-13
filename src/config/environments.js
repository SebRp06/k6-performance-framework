export const ENV = {
  // Permite sobreescribir la URL desde la terminal con -e BASE_URL=...
  BASE_URL: __ENV.BASE_URL || 'https://jsonplaceholder.typicode.com',
};