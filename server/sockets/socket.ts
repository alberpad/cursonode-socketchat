import { io } from '../server';
import Usuarios from '../classes/usuarios';
import { crearMensaje } from '../utilidades/utilidades';
import { IPersona } from '../types/types';

const usuarios = new Usuarios();

io.on('connection', (client: SocketIO.Socket) => {
  client.on('entrarChat', (data, callback) => {
    if (!data.nombre || !data.sala) {
      return callback({
        error: true,
        mensaje: 'El nombre/sala es necesario'
      });
    }
    //console.log('Entró en el chat: ', { id: client.id, usuario: data.nombre });
    client.join(data.sala);
    usuarios.agregarPersona(client.id, data.nombre, data.sala);

    client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

    callback(usuarios.getPersonasPorSala(data.sala));
  });

  client.on('crearMensaje', (data: any) => {
    let persona: IPersona = usuarios.getPersona(client.id);
    let mensaje: any = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
  });

  client.on('disconnect', () => {
    let personaBorrada = usuarios.borrarPersona(client.id);
    client.broadcast
      .to(personaBorrada.sala)
      .emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió.`));
    client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    console.log('Abandonó el chat: ', personaBorrada);
  });

  // Mensajes privados
  client.on('mensajePrivado', (data: any) => {
    let persona = usuarios.getPersona(client.id);
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
  });
});
