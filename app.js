var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://lanabeji:uWCI4oYSRS3duSy5@cluster0-shard-00-00-fwq0s.mongodb.net:27017,cluster0-shard-00-01-fwq0s.mongodb.net:27017,cluster0-shard-00-02-fwq0s.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var index = require('./routes/index');
var users = require('./routes/users');
var usuarioM = require('./routes/usuarioM');
var viajeM = require('./routes/viajeM');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/usuarios', usuarioM);
app.use('/viajes', viajeM);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Se conecta a la base de datos y crea, en caso de que no existan, las colecciones
MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.createCollection("usuarios", function (err, res) {
        if(err) throw err;
        console.log("Collection usuarios creada");
    });
    db.createCollection("viajes", function (err, res) {
        if(err) throw err;
        console.log("Collection viajes creada");
        db.close();
    });
});

//Saca todos los usuarios de la coleccion usuarios
exports.darUsuarios = function (callback){
    MongoClient.connect(url, function (err, db) {
        if(err) throw err;

        console.log("Get usuarios function");
        var usuarios = db.collection("usuarios");

        usuarios.find({}).toArray(function (mongoError, usuarios) {
            if(mongoError) throw mongoError;

            console.log(usuarios.length);
            callback(usuarios);

            db.close();
        });
    });
};

//Insera un usuario en la bd con los valores dados por parametro con nuevo

exports.crearUsuario = function createUsuario(nuevo) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("usuarios").insertOne(nuevo, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

exports.editarUsuario = function updateUsuario(myquery, newvalues) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("usuarios").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    });
};

//Borra el registro del usuario de la tabla con el username y el password
exports.borrarUsuario = function deleteUsuario(myquery) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("usuarios").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};

//Saca todos los viajes de la coleccion viajes
exports.darViajes = function getViajes(callback){
    MongoClient.connect(url, function (err, db) {
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
exports.crearViaje = function createViaje(viaje) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("viajes").insertOne(viaje, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

exports.editarViaje = function updateViaje(myquery, newvalues) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("viajes").updateMany(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " document(s) updated");
            db.close();
        });
    });
};

//Lo mismo de usuario pero con viaje, se borra un viaje dados los valores del viaje excepto pasajeros.
exports.borrarViaje = function deleteViaje(viaje) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("viajes").deleteOne(viaje, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
};

function dropTodo() {
    MongoClient.connect(url, function(err, db) {
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


//Obtiene todos los usuarios
app.get("/usuarios", function (req, res) {

    getUsuarios(function (usuarios) {
        res.json(usuarios);
    });
});

//Crea un nuevo usuario con los valores dados por parámetro
app.get("/nuevoUsuario", function (req, res) {

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


app.get("/updateUsuario", function (req,res) {

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

//Borra un usuario con el username y con password
app.get("/deleteUsuario", function (req, res) {
    var q = req.param("username");
    var p = req.param("password");

    var query = {username: q, password:p};

    deleteUsuario(query);
});

//Obtiene todos los viajes
app.get("/viajes", function (req, res) {

    getViajes(function (viajes) {
        res.json(viajes);
    });
});

//Crea un viaje con los valores dados por parámetro
app.get("/nuevoViaje", function (req, res) {

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

app.get("/updateViaje", function (req,res) {

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
app.get("/deleteViaje", function (req, res) {

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
app.get("/dropTodo", function (req,res) {
    dropTodo();
});

app.listen(process.env.PORT || 5000);

module.exports = app;
