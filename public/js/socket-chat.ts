import { IPersona } from '../../server/types/types';

let socket = io();

const defaultLocation: string = 'index.html';
let params = new URLSearchParams(window.location.search);
let nombre: string | null = params.get('nombre');
let sala: string | null = params.get('sala');
console.log('nombre', nombre);
console.log('sala', sala);
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
    console.log('Usuarios conectados', resp);
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
  console.log(mensaje);
});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas: IPersona[]) {
  console.log(personas);
});

// Mensajes privados

socket.on('mensajePrivado', function(mensaje: any) {
  console.log('Mensaje privado: ', mensaje);
});
