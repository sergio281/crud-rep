import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacientes } from '../entidades/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private Listap = 'http://localhost:8080/pacientes/p/listartodo/';

  private urlBuscarPaciente = 'http://localhost:8080/pacientes/p/buscarCC/';

  private urlEliminarPaciente = 'http://localhost:8080/pacientes/p/eliminarPaciente/';

  constructor(private httpCliente: HttpClient) { }

  obtenerPacientes(): Observable<any> {
    return this.httpCliente.get<any>(this.Listap);
  }

  guardarPaciente(paciente: Pacientes): Observable<any> {
    return this.httpCliente.post<any>('http://localhost:8080/pacientes/p/guardarPaciente/', paciente);
  }

  buscarPaciente(cedula: string): Observable<any> {
    const params = new HttpParams().set('cedula', cedula);
    return this.httpCliente.post<any>(this.urlBuscarPaciente, null, { params });
  }

  eliminarPaciente(cedula: string): Observable<any> {
    return this.httpCliente.post<any>(this.urlEliminarPaciente, cedula);
  }
}