var express = require('express');
var router = express.Router();
var viaje = require("../app.js");

/* GET users listing. */
router.get("/", function (req, res) {

    viaje.darViajes(function (viajes) {
        res.json(viajes);
    });
});

router.get("/nuevoViaje", function (req, res) {

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

    var viaj = {origen: ori, destino: dest, horaEncuentro:hora, fecha:fech, valor:val, cupos:cup, pasajeros: pas, conductor: cond, foto: fot, placa: pla};

    viaje.crearViaje(viaj);
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
    viaje.editarViaje(myquery,newvalues);
});

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

    viaje.borrarViaje(query);
});

module.exports = router;