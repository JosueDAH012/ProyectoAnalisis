//Express es un modulo de Node Js que permite la renderizacion el llamado de funciones por medio de rutas
var express = require('express');
//Router es una funcion de Express que permite el erutamiento
var router = express.Router();
//la variable bd llama a la funcion de conexion con la base de datos desde BD.js
var bd = require('./bd');


//Esta funcion agrega datos a la tabla usuario
router.get("/AddDetOrden", function(req, res, next) {
    //Estas son las variables que se va a enviar a la base de datos.
    //El req.body.idUser hace un request del del body del HTML que llama a esta funcion y busca cualquier item que tenga como nombre "idUser"
    //y guarda el value de ese item en la variable idUser, igual con las demás variables
    const fecha = new Date();
    const idDetOrden = 7;
    const idOrden = 7;
    const apro1 = 100339724;
    const apro2 = 100986470;
    const fechaApro1 = fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate();
    const fechaApro2 = fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate();
    const result1 = "Aprobado";
    const result2 = "Aprobado";
    const resultFinal = "Aprobado";
    //esta funcion llama a bd que realiza la conexion con la base de datos y envía el query que agrega el detalle de la la orden de compra con los valores de las variables
    bd.query("INSERT INTO ORDEN_DETALLE (IDDETORDEN,IDORDEN,APROBADOR_1,APROBADOR_2,FECHAAPROBACION_1,FECHAAPROBACION_2,RESULTADOANALISIS_1,RESULTADOANALISIS_2,CONDICIONFINAL) VALUES (" + idDetOrden + "," + idOrden + "," + apro1 + "," + apro2 + ",'" + fechaApro1 + "','" + fechaApro2 + "','" + result1 + "','" + result2 + "','" + resultFinal + "');", function(err, items) {
        //Se realiza la función con los valores(err, items)
        //err guarda el error en caso de que alguno ocurra
        //items guarda los valores que indican que la consulta se realizó con éxito

        //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
        if (err) {
            console.log(err);

        } else {
            //Si todo sale bien se notifica que el detalle de la orden fue guardada exitosamente
            console.log("Se agrego el detalle de la orden de compra");

        }
    })
});





module.exports = router;