//import { IPersona } from '../../server/types/types';
//import { chatjquery } from '../../public/js/socket-chat-jquery';

var socket = io();

const defaultLocation: string = 'index.html';
// params = new URLSearchParams(window.location.search);
var nombre: string | null = params.get('nombre');
var sala: string | null = params.get('sala');
// console.log('nombre', nombre);
// console.log('sala', sala);
//if (!params.has('nombre') || !params.has('sala')) {

if (!nombre || !sala) {
  window.location.href = defaultLocation;
  throw new Error('El nombre y la sala son necesarios');
}
//}

let usuario = {
  nombre: nombre,
  sala: sala
};

socket.on('connect', function() {
  console.log('Conectado al servidor');
  socket.emit('entrarChat', usuario, function(resp: any) {
    // console.log('Usuarios conectados', resp);
    renderizarUsuarios(resp);
  });
});

// escuchar
socket.on('disconnect', function() {
  console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit(
//   'crearMensaje',
//   {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
//   },
//   function(resp: any) {
//     console.log('respuesta server: ', resp);
//   }
// );

// Escuchar información
socket.on('crearMensaje', function(mensaje: any) {
  // console.log('Mensaje: ', mensaje);
  renderizarMensajes(mensaje, false);
  scrollBottom();
});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas: any) {
  renderizarUsuarios(personas);
});

// Mensajes privados

socket.on('mensajePrivado', function(mensaje: any) {
  console.log('Mensaje privado: ', mensaje);
});
