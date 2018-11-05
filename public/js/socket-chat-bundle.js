(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatjquery;
(function (chatjquery) {
    chatjquery.socket = io();
    chatjquery.params = new URLSearchParams(window.location.search);
    chatjquery.divUsuarios = $('#divUsuarios');
    chatjquery.formEnviar = $('#formEnviar');
    chatjquery.txtMensaje = $('#txtMensaje');
    function renderizarUsuarios(personas) {
        console.log(personas);
        let html = '';
        html += '<li>';
        html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + chatjquery.params.get('sala') + '</span></a>';
        html += '</li>';
        for (let i = 0; i < personas.length; i++) {
            html += '<li>';
            html +=
                '<a data-id="' +
                    personas[i].id +
                    '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' +
                    personas[i].nombre +
                    ' <small class="text-success">online</small></span></a>';
            html += '</li>';
        }
        chatjquery.divUsuarios.html(html);
    }
    chatjquery.renderizarUsuarios = renderizarUsuarios;
    chatjquery.divUsuarios.on('click', 'a', function () {
        let id = $(this).data('id');
        if (id) {
            console.log(id);
        }
    });
    chatjquery.formEnviar.on('submit', function (e) {
        e.preventDefault();
        let mensaje = chatjquery.txtMensaje.val().trim();
        console.log('Mensaje 1: ', mensaje);
        if (mensaje.length === 0) {
            console.log('Cadena vacía');
            return;
        }
        else {
            console.log('Mensaje 2: ', mensaje);
            chatjquery.socket.emit('crearMensaje', {
                nombre: chatjquery.params.get('nombre'),
                mensaje: chatjquery.txtMensaje.val()
            }, function (resp) {
                console.log('respuesta server: ', resp);
            });
        }
    });
})(chatjquery = exports.chatjquery || (exports.chatjquery = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_chat_jquery_1 = require("../../public/js/socket-chat-jquery");
let socket = socket_chat_jquery_1.chatjquery.socket;
let renderizarUsuarios = socket_chat_jquery_1.chatjquery.renderizarUsuarios;
const defaultLocation = 'index.html';
let params = socket_chat_jquery_1.chatjquery.params;
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
    console.log('Mensaje: ', mensaje);
});
socket.on('listaPersonas', function (personas) {
    renderizarUsuarios(personas);
});
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje privado: ', mensaje);
});

},{"../../public/js/socket-chat-jquery":1}]},{},[2]);
