//Express es un modulo de Node Js que permite la renderizacion el llamado de funciones por medio de rutas
var express = require('express');
//Router es una funcion de Express que permite el erutamiento
var router = express.Router();
//la variable bd llama a la funcion de conexion con la base de datos desde BD.js
var bd = require('./bd');


//Esta funcion agrega datos a la tabla usuario
router.post("/AddReg", function(req, res, next) {
    //Estas son las variables que se va a enviar a la base de datos.
    //El req.body.id hace un request del del body del HTML que llama a esta funcion y busca cualquier item que tenga como nombre "id"
    //y guarda el value de ese item en la variable id, igual con las demás variables
    const id = req.body.id;
    const nom = req.body.nom;
    const ape1 = req.body.ape1;
    const ape2 = req.body.ape2;
    const prov = req.body.prov;
    const cant = req.body.cant;
    const dist = req.body.dist;
    const dir = req.body.dir;
    const tel = req.body.tel;
    const mail = req.body.mail;
    const rol = req.body.rol;
    const ext = 0;
    const estado = req.body.estado;
    bd.query("SELECT * FROM USUARIO WHERE IDUSUARIO = '" + id + "';", function(err, items) {
        //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
        if (err) {
            console.log(err);
        } else {
            //Aqui se revisa si el id introducido ya pertence a uno existente en la tabla
            // si items[0] = null es porque el usuario no existe, por lo que se va a gregar el nuevo usario sin problemas 
            if (items[0] == null) {

                //esta funcion llama a bd que realiza la conexion con la base de datos y envía el query que agrega un usuario con los valores de las variables
                bd.query("INSERT INTO USUARIO (IDUSUARIO,NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,PROVINCIA,CANTON,DISTRITO,DIRECCION,TELEFONO,CORREO,IDROL,EXTENSION,ESTADO) VALUES('" + id + "','" + nom + "','" + ape1 + "','" + ape2 + "','" + prov + "','" + cant + "','" + dist + "','" + dir + "','" + tel + "','" + mail + "'," + rol + "," + ext + ",'" + estado + "');", function(err, items) {
                    //Se realiza la función con los valores(err, items)
                    //err guarda el error en caso de que alguno ocurra
                    //items guarda los valores que indican que la consulta se realizó con éxito

                    //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
                    if (err) {
                        console.log(err);
                    } else {
                        //Si todo sale bien se realiza esta consulta todos los tados en la tabla credenciales
                        bd.query("DELETE FROM CREDENCIALES", function(err, items) {
                            //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
                            if (err) {
                                console.log(err);
                            } else {
                                //Si todo sale bien se insertan las credenciales de todos los usuarios de nuevo, incluyendo el que se acaba de agregar
                                bd.query("INSERT INTO CREDENCIALES SELECT IDUSUARIO, aes_encrypt(CONCAT(LTRIM(RTRIM(PRIMER_APELLIDO)), '123'), 'hunter2') AS PASSWORD_USER FROM USUARIO;", function(err, items) {
                                    //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        // si todo sale bien se agrega el Usuario, se agregan las credenciales del nuevo usuario y se rearga la página
                                        console.log(items)
                                        console.log('Todo insertado otra vez')
                                        res.render('Admin', { msg: "Se ha agregado al usaurio exitosamente" })
                                    }
                                })
                            }
                        })

                    }
                })

            } else {
                //Si items es diferente de null es porque existe un usuario con el mismo id, lo que quiere decir que el usuario ya existe
                res.render('Admin', { msg: "El usuario que intenta agregar ya existe" })
            }
        }
    })

});

//Esta funcion realiza el update de  la tabla USUARIOS
router.post("/UptReg", function(req, res, next) {
    //Estas son las variables que se va a enviar a la base de datos.
    //El req.body.id hace un request del del body del HTML que llama a esta funcion y busca cualquier item que tenga como nombre "id"
    //y guarda el value de ese item en la variable id, igual con las demás variables
    const id = req.body.idAct;
    const rol = req.body.rolAct;
    const estado = req.body.estadoAct;
    //esta funcion llama a bd que realiza la conexion con la base de datos y envía el query con los valores de las variables
    bd.query("UPDATE USUARIO SET IDROL = " + rol + ", ESTADO = '" + estado + "' WHERE IDUSUARIO = '" + id + "';", function(err, items) {
        //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
        if (err) {
            console.log(err);
        } else {
            // si todo sale bien se actualiza el Usuario y se envia una consulta para obtener los datos de la tabla actualizados
            bd.query("SELECT * FROM USUARIO", function(err, items) {
                //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
                if (err) {
                    console.log(err);
                } else {
                    //si todo sale bienrecarga la página con los nuevos datos
                    // y un mensaje indicando que el usuario se actualizo correctamente

                    res.render('UserTables', { records: items, msg: "Se ha actualizado al usuario correctamente" });

                }
            })
        }
    })
});

router.get("/GetReg", function(req, res, next) {
    //esta funcion llama a bd que realiza la conexion con la base de datos y envía el query a la base
    bd.query("SELECT * FROM USUARIO", function(err, items) {
        //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
        if (err) {
            console.log(err);
        } else {
            // si todo sale bien se obtienen los datos de la tabla y se renderiza la pagina, cargando en la tabla correspondiente sus respectivos datos
            res.render('UserTables', { records: items });

        }
    })
});



module.exports = router;