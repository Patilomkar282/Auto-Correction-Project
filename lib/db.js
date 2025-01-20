
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: '127.0.0.1',      
  user: 'root',           
  password: '121331', 
  port: 3306,           
  database: 'test'      
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

export default connection;
