"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let socket = io();
const defaultLocation = 'index.html';
let params = new URLSearchParams(window.location.search);
let nombre = params.get('nombre');
let sala = params.get('sala');
console.log('nombre', nombre);
console.log('sala', sala);
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
        console.log('Usuarios conectados', resp);
    });
});
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});
socket.on('crearMensaje', function (mensaje) {
    console.log(mensaje);
});
socket.on('listaPersonas', function (personas) {
    console.log(personas);
});
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje privado: ', mensaje);
});
//# sourceMappingURL=socket-chat.js.map