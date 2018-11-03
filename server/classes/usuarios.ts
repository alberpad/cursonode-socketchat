import { IUsuarios } from '../interfaces/Interfaces';
import { IPersona } from '../types/types';

export class Usuarios implements IUsuarios {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id: string, nombre: string, sala: string): IPersona[] {
    let persona = { id, nombre, sala };
    this.personas.push(persona);
    return this.personas;
  }

  getPersona(id: string): IPersona {
    let persona = this.personas.filter((persona) => {
      return persona.id === id;
    })[0];
    return persona;
  }

  getPersonas() {
    return this.personas;
  }

  getPersonasPorSala(sala: string): IPersona[] {
    let personasEnSala = this.personas.filter((persona) => {
      return persona.sala === sala;
    });
    return personasEnSala;
  }

  borrarPersona(id: string): IPersona {
    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter((persona) => {
      return persona.id != id;
    });
    return personaBorrada;
  }

  personas: IPersona[];
}

export default Usuarios;
