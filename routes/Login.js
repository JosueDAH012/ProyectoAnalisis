//Express es un modulo de Node Js que permite la renderizacion el llamado de funciones por medio de rutas
var express = require('express');
//Router es una funcion de Express que permite el erutamiento
var router = express.Router();
//la variable bd llama a la funcion de conexion con la base de datos desde BD.js
var bd = require('./bd');


//Esta funcion es la que verifica el Login
router.post("/Login", function(req, res, next) {
    //Estas son las variables que se va a enviar a la base de datos.
    //El req.body.user hace un request del del body del HTML que llama a esta funcion y busca cualquier item que tenga como nombre "id"
    //y guarda el value de ese item en la variable user, igual con las demás variables
    const user = req.body.user;
    const pass = req.body.pass;
    //sta funcion realiza una consulta en la cual se verifica que el usuario y la contraseña coincidan con las de la tabla CREDENCIALES
    bd.query("SELECT IDUSUARIO, cast(aes_decrypt(USUARIO_PASSWORD, 'hunter2') AS char) AS 'Pass' FROM CREDENCIALES WHERE IDUSUARIO = '" + user + "' AND cast(aes_decrypt(USUARIO_PASSWORD, 'hunter2') AS char) = '" + pass + "' ;", function(err, items) {
        //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
        if (err) {
            console.log(err);
        } else {
            //Si los items devuelven null es porque la variable items que guarda los datos en caso de que toda salga bien no tiene datos
            //Lo que quiere decir que el usuario no fue encontrado
            if (items[0] == null) {
                //Se renderiza de nuevo la pagina con el mensaje 'El usuario no existe'
                res.render('Login', { msg: 'El usuario o la contraseña no coinciden' });
            } else {
                //En caso de que items devuelva datos es porque el usaurio existes
                //Por lo que esta funcion se encarga de verifficar su estado (Activo o inactivo)
                bd.query("SELECT ESTADO FROM USUARIO WHERE IDUSUARIO = '" + user + "';", function(err, items) {
                    //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
                    if (err) {
                        console.log(err);
                    } else {
                        //Si todo sale bien se verifica el estado
                        if (items[0].ESTADO == "Activo") {
                            //En caso de que el estado sea Activo, realiza esta funcion que verifica su rol
                            bd.query("SELECT IDROL FROM USUARIO WHERE IDUSUARIO = '" + user + "';", function(err, items) {
                                //Si ocurre algún error a la hora de realizar la consulta, este se podrá observar en la consola
                                if (err) {
                                    console.log(err);
                                } else {
                                    //Si el rol es 1 es porque el usuario es administrador
                                    if (items[0].IDROL == 1) {
                                        //Se renderiza la ventana que pertenece al Administrador de cuentas
                                        res.render('Admin');

                                    } else {
                                        if (items[0].IDROL == 2) {
                                            //Se renderiza la ventana que pertenece al Aprobador Jefe
                                            res.render('Login', { msg: 'El usuario es aprobador jefe' });

                                        } else {
                                            if (items[0].IDROL == 3) {
                                                //Se renderiza la ventana que pertenece al Aprobador Financiero 1
                                                res.render('Login', { msg: 'El usuario es aprobador fin 1' });

                                            } else {
                                                if (items[0].IDROL == 4) {
                                                    //Se renderiza la ventana que pertenece al Aprobador Financiero 2
                                                    res.render('Login', { msg: 'El usuario es aprobador fin 2' });

                                                } else {
                                                    if (items[0].IDROL == 5) {
                                                        //Se renderiza la ventana que pertenece al Aprobador Financiero 3
                                                        res.render('Login', { msg: 'El usuario es aprobador fin 3' });

                                                    } else {
                                                        if (items[0].IDROL == 6) {
                                                            //Se renderiza la ventana que pertenece al Cliente
                                                            res.render('Login', { msg: 'El usuario es cliente' });

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }
                            })

                        } else {
                            //En caso de que el usaurio se encuentre inactivo de renderiza de nuevo la pagina con el mensaje 'El usuario se encuentra inactivo' 
                            res.render('Login', { msg: 'El usuario se encuentra inactivo' });

                        }

                    }
                })
            }
        }
    })
});

module.exports = router;