import { IPersona } from '../types/types';
export interface IUsuarios {
  personas: IPersona[];
  agregarPersona(id: string, nombre: string, sala: string): IPersona[];
  getPersona(id: string): IPersona;
  getPersonas(): IPersona[];
  getPersonasPorSala(sala: string): IPersona[];
  borrarPersona(id: string): IPersona;
}
