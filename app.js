const mysql = require ('mysql'); 

// crear una conexión a db 
const connection = mysql.createConnection ({ 
    host: 'localhost', 
    user: 'root', 
    password: '123456789', 
  }); 

  connection.connect ((err) => { 
    if (err) { 
      console.log ('Error al conectar con Db'); 
      return; 
    } 
    console.log ('Conexión establecida'); 
  }); 

  connection.end ((err) => { 
    
  });