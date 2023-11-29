import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'web2',
});

// Configura las funciones de promesa para db
const promisePool = db.promise();

// Exporta both connection and promise pool
export { db, promisePool };
