var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var url = "mongodb://lanabeji:uWCI4oYSRS3duSy5@cluster0-shard-00-00-fwq0s.mongodb.net:27017,cluster0-shard-00-01-fwq0s.mongodb.net:27017,cluster0-shard-00-02-fwq0s.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

function getUsuarios(callback) {

    mongodb.connect(url, function (err, db) {
        if (err) throw err;
        var usuarios = db.collection("usuarios");


        usuarios.find({}).toArray(function (err2, usuarios) {
            if (err2) throw err2;

            callback(usuarios);
        });
    });
}


function createUsuario(nuevo) {

    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("usuarios").insertOne(nuevo, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

function login(nuevo) {


};

function updateUsuario(myquery, newvalues) {

    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("usuarios").updateMany(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    });
};

function deleteUsuario(myquery) {
    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("usuarios").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};


function findByUser(userna, callback){
    var users = db.get().collection("usuarios");
    users.findOne({username:userna}, function(err, user){
        callback(err, user);
    });
};

function findByPassword(password, callback){
    var users = db.get().collection("usuarios");
    users.findOne({password:password}, function(err, user){
        callback(err, user);
    });
};

//Saca todos los viajes de la coleccion viajes
function getViajes(callback) {

    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        console.log("Get viajes function");
        var viajes = db.collection("viajes");


        viajes.find({}).toArray(function (mongoError, viajes) {
            if (mongoError) throw mongoError;

            console.log(viajes.length);
            callback(viajes);

            db.close();
        });
    });
};

//Lo mismo de usuario pero con viaje
function createViaje(viaje) {

    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("viajes").insertOne(viaje, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

function updateViaje(myquery, newvalues) {

    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("viajes").updateMany(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    });
};

//Lo mismo de usuario pero con viaje, se borra un viaje dados los valores del viaje excepto pasajeros.
function deleteViaje(viaje) {
    mongodb.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("viajes").deleteOne(viaje, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};

function dropTodo() {
    mongodb.connect(url, function (err, db) {
        if (err) throw err;
        db.dropCollection("usuarios", function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection usuarios deleted");
        });
        db.dropCollection("viajes", function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection viajes deleted");
        });
    });
};


// router.post("/login", function (req, res) {
//     var usern = req.body.username;
//     var pass = req.body.password;
//     console.log("username: "+usern+" password: "+pass);
//     var usuario = {username: usern, password: pass};
//     if(login(usuario)){
//         res(true)
//     }
// });

// router.post("/login", function(req, res){
//
//     console.log("estoy en login de index.js");
//     findByUser(req.body.username,function(err,user){
//         if(err){
//             console.log("error de usuario");
//             return res.status(400).json({error:err});
//         }
//         if(!user) return res.status(206).json({message:"That user doesn't exist"}).end();
//
//         findByPassword(req.body.password,function(err,userMail){
//             if(err){
//                 console.log("error de pass");
//                 return res.status(400).json({error:err});
//             }
//             if(!userMail) return res.status(204).json({message:"Wrong Password"}).end();
//             console.log("encontro pass" + userMail);
//
//             res.status(200);
//             res.send(userMail);
//         })
//     });
// });

router.post("/login", function (req, res) {

    var usernam = req.body.username;
    var pass = req.body.password;

    var nuevo = {username: usernam, password: pass};


    mongodb.connect(url, function (err, db) {
        if (err) throw err;
        var usuarios = db.collection("usuarios");

        usuarios.find(nuevo).toArray(function (err2, usuarios) {
            if (err2) throw err2;
            if(usuarios.length>0){
                console.log("Encontré el usuario");
                res.status(200)
                res.send(usuarios[0].json);
                db.close();
            }
            console.log("No hay nada");
            res.sendStatus(460);
            db.close();
        });
    });
});

router.get("/getUsuarios", function (req, res) {
    getUsuarios(function (usuarios) {
        console.log("Index.js en getUsuarios");
        res.json(usuarios);
    });
});

router.post("/createUsuario", function (req, res) {

    var usernam = req.body.username;
    var pass = req.body.password;
    var nam = req.body.name;
    var tip = req.body.tipo;
    var pic = req.body.profile_pic;
    var pla = req.body.placa;
    var fot = req.body.foto;

    var nuevo = {name: nam, username: usernam, password: pass, tipo: tip, profile_pic: pic, placa: pla, foto: fot};

    createUsuario(nuevo);
});

router.post("/updateUsuario", function (req, res) {

    var usern = req.body.username;
    var pass = req.body.password;

    var nom = req.body.name;
    var pic = req.body.profile_pic;
    var pla = req.body.placa;
    var fot = req.body.foto;

    var myquery = {username: usern, password: pass};
    var newvalues = {$set: {name: nom, profile_pic: pic, placa: pla, foto: fot}};
    updateUsuario(myquery, newvalues);
});

router.get("/deleteUsuario", function (req, res) {
    var q = req.body.username;
    var p = req.body.password;

    var query = {username: q, password: p};

    deleteUsuario(query);
});

//Obtiene todos los viajes
router.get("/getViajes", function (req, res) {

    getViajes(function (viajes) {
        res.json(viajes);
    });
});

//Crea un viaje con los valores dados por parámetro
router.post("/createViaje", function (req, res) {

    var ori = req.body.origen;
    var dest = req.body.destino;
    var hora = req.body.horaEncuentro;
    var fech = req.body.fecha;
    var val = req.body.valor;
    var cup = req.body.cupos;
    var pas = req.body.pasajeros;
    var cond = req.body.conductor;
    var fot = req.body.foto;
    var pla = req.body.placa;

    var viaje = {
        origen: ori,
        destino: dest,
        horaEncuentro: hora,
        fecha: fech,
        valor: val,
        cupos: cup,
        pasajeros: pas,
        conductor: cond,
        foto: fot,
        placa: pla
    };

    createViaje(viaje);
});

router.post("/updateViaje", function (req, res) {

    var ori = req.body.origen;
    var dest = req.body.destino;
    var hora = req.body.horaEncuentro;
    var fech = req.body.fecha;
    var val = req.body.valor;
    var cup = req.body.cupos;
    var pas = req.body.pasajeros;
    var cond = req.body.conductor;
    var fot = req.body.foto;
    var pla = req.body.placa;

    var myquery = {conductor: cond, fecha: fech};
    var newvalues = {
        $set: {
            origen: ori,
            destino: dest,
            horaEncuentro: hora,
            valor: val,
            cupos: cup,
            pasajeros: pas,
            foto: fot,
            placa: pla
        }
    };
    updateViaje(myquery, newvalues);
});

//Borra un viaje con todos los parametros excepto pasajeros, no son necesarios.
router.get("/deleteViaje", function (req, res) {

    var ori = req.body.origen;
    var dest = req.body.destino;
    var hora = req.body.horaEncuentro;
    var fech = req.body.fecha;
    var val = req.body.valor;
    var cup = req.body.cupos;

    var cond = req.body.conductor;
    var fot = req.body.foto;
    var pla = req.body.placa;

    var query = {
        origen: ori,
        destino: dest,
        horaEncuentro: hora,
        fecha: fech,
        valor: val,
        cupos: cup,
        conductor: cond,
        foto: fot,
        placa: pla
    };

    deleteViaje(query);
});


//Borra lo de la tabla por si escribo valores mal y quiero borrar
router.get("/dropTodo", function (req, res) {
    dropTodo();
});

router.get("/", function (req, res) {
    res.render('index', {title: 'Express'});
});


module.exports = router;
