import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'web2',
  });
  
  db.connect((err) => {
    if (err) {
      console.log('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });

  export default db;