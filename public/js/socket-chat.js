"use strict";
var socket = io();
const defaultLocation = 'index.html';
var nombre = params.get('nombre');
var sala = params.get('sala');
if (!nombre || !sala) {
    window.location.href = defaultLocation;
    throw new Error('El nombre y la sala son necesarios');
}
let usuario = {
    nombre: nombre,
    sala: sala
};
socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp) {
        renderizarUsuarios(resp);
    });
});
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});
socket.on('crearMensaje', function (mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});
socket.on('listaPersonas', function (personas) {
    renderizarUsuarios(personas);
});
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje privado: ', mensaje);
});
//# sourceMappingURL=socket-chat.js.map