//mysql es un nodulo de Node js que permite realizar la conexion con la base de DAtos Mysql
const mysql = require("mysql");
//En esta variable conn se guardan las credenciales de la base de datos como el host, el username, la contraseña y la base de datos a la que se quiere acceder
var conn = mysql.createConnection({
    host: '34.94.174.144',
    user: 'Fran',
    password: '1234',
    database: 'Proveeduria'
})


//Esta funcion es la que realiza la conexion con la base de datos pasando los parametros de la variable conn
conn.connect(function(err) {
    //En caso de error se indicará en la consola el error
    if (err) {
        console.log(err);
    } else {
        //Si la conexion se realizó correctamente se indiacará en la consola con el mensaje 'Se ha conectado a la base de datos'
        console.log("Se ha conectado a la base de datos");
    }
});

module.exports = conn;