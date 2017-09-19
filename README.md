# Carpooling

Esta página web busca ayudar a las personas que viven en municipios aledaños a la Universidad de Los Andes, como Zipaquirá, Chía y Cajicá.
Esto se logra registrando tanto a pasajeros como a conductores, los cuales pueden reservar viajes y crear viajes respectivamente.

El desarrollo de esta página se hizo por medio de HTML, CSS, JS, NodeJS, MongoDB, React y JQuery.

Para ingresar a la página y crear o reservar viajes, se debe hacer login con nombre de usuario y contraseña, dependiendo de sí el usuario es conductor o pasajero, se puede crear o no un viaje. Solo los conductores pueden crear viajes. Un viaje incluye un lugar de origen y de destino, hora de encuentro, fecha, valor, cupos disponibles, lista de pasajeros, conductor, foto del carro y placa del carro.
La información de un usuario es nombre, nombre de usuario, tipo(conductor o pasajero), foto de perfil, foto del carro y placa del carro (en caso de ser conductor).

Para el atributo tipo, true significa que es conductor, false que es pasajero.

Al crear un usuario es necesario completar todos los campos anteriormente mencionados, excepto si es pasajero, en ese caso la foto y la placa del carro están vacíos.
Para crear los viajes también es necesario completar todos los campos.

Se puede eliminar un usuario dado el username y la contraseña del mismo. Se puede eliminar un viaje con todos los parámetros del viaje, a excepción de los pasajeros.

Para editar la información de un usuario, se necesita el usuario y la contraseña y se pueden cambiar todos los atributos, excepto tipo.
Para editar un viaje, se puede editar todo menos el conductor y la fecha.

Para buscar un usuario, basta con escribir el nombre de este.
Para buscar un viaje, es necesario escribir el origen y el destino.
Para buscar los viajes de un conductor, se busca por el nombre del conductor.
