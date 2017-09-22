var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var url = "mongodb://lanabeji:uWCI4oYSRS3duSy5@cluster0-shard-00-00-fwq0s.mongodb.net:27017,cluster0-shard-00-01-fwq0s.mongodb.net:27017,cluster0-shard-00-02-fwq0s.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

function getUsuarios(callback) {

    mongodb.connect(url, function (err,db){
        if(err) throw err;
        var usuarios = db.collection("usuarios");

        usuarios.find({}).toArray(function (err2,usuarios){
            if(err2) throw err2;

        callback(usuarios);
        });
    });
}

function createUsuario(nuevo) {

    mongodb.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("usuarios").insertOne(nuevo, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

function updateUsuario(myquery, newvalues) {

    mongodb.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("usuarios").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    });
};

function deleteUsuario(myquery) {
    mongodb.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("usuarios").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};


//Saca todos los viajes de la coleccion viajes
function getViajes(callback){
    mongodb.connect(url, function (err, db) {
        if(err) throw err;

        console.log("Get viajes function");
        var viajes = db.collection("viajes");

        viajes.find({}).toArray(function (mongoError, viajes) {
            if(mongoError) throw mongoError;

            console.log(viajes.length);
            callback(viajes);

            db.close();
        });
    });
};

//Lo mismo de usuario pero con viaje
function createViaje(viaje) {

    mongodb.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("viajes").insertOne(viaje, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

function updateViaje(myquery, newvalues) {

    mongodb.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("viajes").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    });
};

//Lo mismo de usuario pero con viaje, se borra un viaje dados los valores del viaje excepto pasajeros.
function deleteViaje(viaje) {
    mongodb.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("viajes").deleteOne(viaje, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};

function dropTodo() {
    mongodb.connect(url, function(err, db) {
        if (err) throw err;
        db.dropCollection("usuarios", function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection usuarios deleted");
        });
        db.dropCollection("viajes", function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection viajes deleted");
        });
    });
};



router.get("/getUsuarios", function (req,res) {
    getUsuarios(function (usuarios) {
        console.log("Index.js en getUsuarios");
        res.json(usuarios);
    });
});

router.get("/createUsuario", function (req,res) {

    var nam= req.param("name");
    var usernam = req.param("username");
    var pass = req.param("password");
    var tip = req.param("tipo");
    var pic = req.param("profile_pic");
    var pla = req.param("placa");
    var fot = req.param("foto");

    var nuevo = {name: nam, username: usernam, password: pass, tipo: tip, profile_pic: pic, placa: pla, foto:fot};

    createUsuario(nuevo);
});

router.get("/updateUsuario", function (req,res) {

    var usern = req.param("username");
    var pass = req.param("password");

    var nom = req.param("name");
    var pic = req.param("profile_pic");
    var pla = req.param("placa");
    var fot = req.param("foto");

    var myquery = { username: usern, password: pass };
    var newvalues = {$set: {name: nom, profile_pic:pic, placa: pla, foto:fot} };
    updateUsuario(myquery,newvalues);
});

router.get("/deleteUsuario", function (req, res) {
    var q = req.param("username");
    var p = req.param("password");

    var query = {username: q, password:p};

    deleteUsuario(query);
});

//Obtiene todos los viajes
router.get("/getViajes", function (req, res) {

    getViajes(function (viajes) {
        res.json(viajes);
    });
});

//Crea un viaje con los valores dados por parámetro
router.get("/createViaje", function (req, res) {

    var ori= req.param("origen");
    var dest = req.param("destino");
    var hora = req.param("horaEncuentro");
    var fech = req.param("fecha");
    var val = req.param("valor");
    var cup = req.param("cupos");
    var pas = req.param("pasajeros");
    var cond = req.param("conductor");
    var fot = req.param("foto");
    var pla = req.param("placa");

    var viaje = {origen: ori, destino: dest, horaEncuentro:hora, fecha:fech, valor:val, cupos:cup, pasajeros: pas, conductor: cond, foto: fot, placa: pla};

    createViaje(viaje);
});

router.get("/updateViaje", function (req,res) {

    var ori= req.param("origen");
    var dest = req.param("destino");
    var hora = req.param("horaEncuentro");
    var fech = req.param("fecha");
    var val = req.param("valor");
    var cup = req.param("cupos");
    var pas = req.param("pasajeros");
    var cond = req.param("conductor");
    var fot = req.param("foto");
    var pla = req.param("placa");

    var myquery = { conductor: cond, fecha:fech};
    var newvalues = {$set: {origen: ori, destino: dest, horaEncuentro:hora, valor:val, cupos:cup, pasajeros: pas, foto: fot, placa: pla} };
    updateViaje(myquery,newvalues);
});

//Borra un viaje con todos los parametros excepto pasajeros, no son necesarios.
router.get("/deleteViaje", function (req, res) {

    var ori= req.param("origen");
    var dest = req.param("destino");
    var hora = req.param("horaEncuentro");
    var fech = req.param("fecha");
    var val = req.param("valor");
    var cup = req.param("cupos");
    var cond = req.param("conductor");
    var fot = req.param("foto");
    var pla = req.param("placa");

    var query = {origen: ori, destino: dest, horaEncuentro:hora, fecha:fech, valor:val, cupos:cup, conductor: cond, foto: fot, placa: pla};

    deleteViaje(query);
});


//Borra lo de la tabla por si escribo valores mal y quiero borrar
router.get("/dropTodo", function (req,res) {
    dropTodo();
});


module.exports = router;
