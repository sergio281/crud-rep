import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicos } from '../entidades/medicos';

@Injectable({
  providedIn: 'root'
})
export class MedicosServices {

  private listaM = 'http://localhost:8080/medico/m/listartodo/';
  private MedicosEspecialidad = 'http://localhost:8080/medico/m/buscarespecialidad/';
  private urlGuardar = 'http://localhost:8080/medico/m/guardarMedico/';
  private urlEliminarMedico = 'http://localhost:8080/medico/m/eliminarMedico/';
  private urlBuscarMedico = 'http://localhost:8080/medico/m/buscaridentificador/';

  constructor(private httpCliente: HttpClient) { }

  obtenerMedicos(): Observable<any[]> {
    return this.httpCliente.get<any[]>(this.listaM);
  }

  obtenerMedicosEspecialidad(especialidad: string): Observable<any[]> {
    const params = new HttpParams().set('especialidad', especialidad);
    return this.httpCliente.post<any[]>(this.MedicosEspecialidad, null, { params });
  }

  guardarMedico(medico: Medicos): Observable<any> {
    return this.httpCliente.post<any>(this.urlGuardar, medico);
  }

  eliminarMedico(id: number): Observable<any> {
    return this.httpCliente.post<any>(this.urlEliminarMedico, id);
  }

  buscarMedico(id: string): Observable<any> {
    const params = new HttpParams().set('identificador', id);
    return this.httpCliente.post<any>(this.urlBuscarMedico, null, { params });
  }
}