import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConsultasService {

    private base = 'http://localhost:8080/cita/c/';

    constructor(private httpCliente: HttpClient) { }

    medicosConCitas(): Observable<string[]> {
        return this.httpCliente.get<string[]>(this.base + 'medicosConCitas/');
    }

    citasPorPaciente(cedula: string): Observable<any[]> {
        const params = new HttpParams().set('cedula', cedula);
        return this.httpCliente.post<any[]>(this.base + 'citasPaciente/', null, { params });
    }

    cantidadAsignadas(fecha: string): Observable<number> {
        const params = new HttpParams().set('fecha', fecha);
        return this.httpCliente.post<number>(this.base + 'cantidadAsignadas/', null, { params });
    }

    cantidadCanceladas(fecha: string): Observable<number> {
        const params = new HttpParams().set('fecha', fecha);
        return this.httpCliente.post<number>(this.base + 'cantidadCanceladas/', null, { params });
    }

    marcarAsistida(cedula: string): Observable<string> {
        const params = new HttpParams().set('cedula', cedula);
        return this.httpCliente.post(this.base + 'marcarAsistida/', null, { params, responseType: 'text' });
    }

    citasPorMedicoFecha(fecha: string): Observable<any[]> {
        const params = new HttpParams().set('fecha', fecha);
        return this.httpCliente.post<any[]>(this.base + 'citasPorMedicoFecha/', null, { params });
    }

    pacientesAsistieronFecha(fecha: string): Observable<number> {
        const params = new HttpParams().set('fecha', fecha);
        return this.httpCliente.post<number>(this.base + 'pacientesAsistieronFecha/', null, { params });
    }
}