import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class EnviarDatosService {
    private platformId = inject(PLATFORM_ID);
    public pacienteSignal = signal<any>(this.obtenerPacienteInicial());

    private obtenerPacienteInicial() {
        if (isPlatformBrowser(this.platformId)) {
            const pacienteGuardado = localStorage.getItem('pacienteActual');
            return pacienteGuardado ? JSON.parse(pacienteGuardado) : null;
        }
        return null;
    }

    enviar(datosPaciente: any) {
        console.log('Guardando dato:', datosPaciente);
        this.pacienteSignal.set(datosPaciente);
        localStorage.setItem('pacienteActual', JSON.stringify(datosPaciente));
    }

    limpiar() {
        this.pacienteSignal.set(null);
        localStorage.removeItem('pacienteActual');
    }
}