export const crearMensaje = (nombre: string, mensaje: string) => {
  return {
    nombre,
    mensaje,
    fecha: new Date().getTime()
  };
};
