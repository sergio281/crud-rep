import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


import { Medicos } from '../entidades/medicos';
import { Citas } from '../entidades/citas';
import { CitasService } from '../servicios/citas';
import { PacientesService } from '../servicios/pacientes';
import { MedicosServices } from '../servicios/medicos'; 

@Component({
  selector: 'app-solicitar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html'
})
export class SolicitarCitaComponent implements OnInit {

  medicos: Medicos[] = [];
  especialidad: string = '';
  cita: Citas = new Citas();
  cc: string = '';

  constructor(
    private servicioCitas: CitasService, 
    private servicioPaciente: PacientesService,
    private servicioMedicos: MedicosServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  verEspecialistas(): void {
    const e = document.getElementById("especialidad") as HTMLInputElement;
    console.log(e.value);

    this.servicioMedicos.obtenerMedicosEspecialidad(e.value).subscribe(dato => {
      console.log(dato);
      this.medicos = dato;
      this.cdr.detectChanges()
    });
  }

  elegirMedico(m: Medicos): void {
    console.log(m);
    this.cita.medico = m;
    this.solicitarCita();
  }

  solicitarCita(): void {
    const modal = document.getElementById("registro");
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  cerrarModal(): void {
    const modal = document.getElementById("registro");
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  guardarcita(): void {
    this.buscarPaciente();
  }

  async buscarPaciente(): Promise<void> {
    try {
      const dato = await firstValueFrom(this.servicioPaciente.buscarPaciente(this.cc));
      console.log(dato);
      this.cita.paciente = dato;
      
    } catch (error) {
      console.error('Error al buscar el paciente:', error);
      alert("No se encontró el paciente con la cédula ingresada.");
      return;
    }

    if (this.cita.hora && this.cita.hora.length === 5) {
      this.cita.hora = `${this.cita.hora}:00` as any;
    }

    console.log(this.cita);

    this.servicioCitas.guardarCita(this.cita).subscribe(dato => {
      console.log(dato);
      this.cerrarModal();
      alert("Su cita ha sido asignada con éxito");

      this.medicos = [];
      this.cita = new Citas();
      const inputEsp = document.getElementById("especialidad") as HTMLInputElement;
      if (inputEsp) inputEsp.value = "";
    });
  }
}