import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../entidades/citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private urlEspecialistas = 'http://localhost:8080/medico/m/especialistas/';
  private urlGuardar = 'http://localhost:8080/cita/c/guardarCita/';

  constructor(private httpCliente: HttpClient) {}

  elegirEspecialistas(especialidad: string): Observable<any> {
    return this.httpCliente.post(this.urlEspecialistas, especialidad);
  }

  guardarCita(cita: any): Observable<any> {
    return this.httpCliente.post(this.urlGuardar, cita);
  }
} 