(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
