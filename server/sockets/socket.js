"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const usuarios_1 = require("../classes/usuarios");
const utilidades_1 = require("../utilidades/utilidades");
const usuarios = new usuarios_1.Usuarios();
server_1.io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }
        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', utilidades_1.crearMensaje('Administrador', `${data.nombre} se unió`));
        callback(usuarios.getPersonasPorSala(data.sala));
    });
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = utilidades_1.crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast
            .to(personaBorrada.sala)
            .emit('crearMensaje', utilidades_1.crearMensaje('Administrador', `${personaBorrada.nombre} salió.`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', utilidades_1.crearMensaje(persona.nombre, data.mensaje));
    });
});
//# sourceMappingURL=socket.js.map