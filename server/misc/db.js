import mysql from 'mysql2';
import util from 'util';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'web2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect((err) => {
  if (err) {
    console.log('Error al conectar a MySQL:', err);
  } else {
    console.log('Conexión exitosa a MySQL en XAmpp');
  }
});

const queryAsync = util.promisify(db.query).bind(db);

export { queryAsync };
