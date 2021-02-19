//Express es un modulo de Node Js que permite la renderizacion el llamado de funciones por medio de rutas
var express = require('express');
//Router es una funcion de Express que permite el erutamiento
var router = express.Router();
//la variable bd llama a la funcion de conexion con la base de datos desde BD.js
var bd = require('./bd');


//Esta funcion agrega datos a la tabla usuario
router.get("/AddOrden", function(req, res, next) {
    //Estas son las variables que se va a enviar a la base de datos.
    //El req.body.idUser hace un request del del body del HTML que llama a esta funcion y busca cualquier item que tenga como nombre "idUser"
    //y guarda el value de ese item en la variable idUser, igual con las demás variables
    const fecha = new Date();
    const idOrden = 7;
    const idUser = "117370032";
    const det = "compra1";
    const tipo = "DOMICILIO";
    const fechaOrden = fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate();
    const fechaEnt = "2020-07-31";
    const monto = "100000.5";
    const prov = "asd";
    const cant = "ads";
    const dist = "asd";
    const dir = "dasdsadasdsdsdasd";
    //esta funcion llama a bd que realiza la conexion con la base de datos y envía el query que agrega la orden de compra con los valores de las variables
    bd.query("INSERT INTO ORDEN (IDORDEN,IDUSUARIO,DETALLE_ORDEN,TIPOENTREGA,FECHAORDEN,FECHAENTREGA,MONTO,PROVINCIA,CANTON,DISTRITO,DIRECCION) VALUES(" + idOrden + ",'" + idUser + "','" + det + "','" + tipo + "','" + fechaOrden + "','" + fechaEnt + "'," + monto + ",'" + prov + "','" + cant + "','" + dist + "','" + dir + "');", function(err, items) {
        //Se realiza la función con los valores(err, items)
        //err guarda el error en caso de que alguno ocurra
        //items guarda los valores que indican que la consulta se realizó con éxito

        //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
        if (err) {
            console.log(err);
            console.log(fechaOrden);
        } else {
            //Si todo sale bien se notifica que la orden fue guardad exitosamente y se renderiza de nuevo la pagina
            console.log("Se agrego la orden de compra");

        }
    })
});





module.exports = router;