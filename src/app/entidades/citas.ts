import { Pacientes } from "./pacientes";
import { Medicos } from "./medicos";

export class Citas {
    fecha: Date;
    hora: string;
    estado: string = "Asignada";
    medico: Medicos;
    paciente: Pacientes;
}
