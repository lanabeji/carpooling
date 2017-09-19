var express = require('express');
var router = express.Router();
var usuario = require("../app.js");

/* GET home page. */
router.get("/", function (req, res) {

    usuario.darUsuarios(function (usuarios) {
        res.json(usuarios);
    });
});

router.get("/nuevoUsuario", function (req, res) {

    var nam= req.param("name");
    var usernam = req.param("username");
    var pass = req.param("password");
    var tip = req.param("tipo");
    var pic = req.param("profile_pic");
    var pla = req.param("placa");
    var fot = req.param("foto");

    var nuevo = {name: nam, username: usernam, password: pass, tipo: tip, profile_pic: pic, placa: pla, foto:fot};

    usuario.crearUsuario(nuevo);
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
    usuario.editarUsuario(myquery,newvalues);
});

router.get("/deleteUsuario", function (req, res) {
    var q = req.param("username");
    var p = req.param("password");

    var query = {username: q, password:p};

    usuario.borrarUsuario(query);
});

module.exports = router;