import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacientesService } from '../servicios/pacientes';
import { Pacientes } from '../entidades/pacientes';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css'
})
export class PacientesComponent implements OnInit {
  listaPacientes: Pacientes[] = [];
  paciente: Pacientes = new Pacientes();
  bandera: boolean = false;   // false = Registrar, true = Actualizar

  constructor(
    private pacienteService: PacientesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (datos) => {
        this.listaPacientes = datos;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al conectar:', error);
      }
    });
  }

  abrirModal(): void {
    const modal = document.getElementById("registro");
    if (modal != null) modal.style.display = 'block';
  }

  cerrarModal(): void {
    this.paciente = new Pacientes();
    this.bandera = false;
    const modal = document.getElementById("registro");
    if (modal != null) modal.style.display = 'none';
  }

  nuevoPaciente(): void {
    this.paciente = new Pacientes();
    this.bandera = false;
    this.abrirModal();
  }

  guardarPaciente(): void {
    this.pacienteService.guardarPaciente(this.paciente).subscribe({
      next: (respuesta) => {
        console.log('Paciente guardado:', respuesta);
        this.cargarPacientes();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('Error al guardar el paciente:', error);
      }
    });
  }

  actualizar(p: Pacientes): void {
    this.paciente = { ...p };
    this.bandera = true;
    this.abrirModal();
  }

  eliminar(cc: string): void {
    this.pacienteService.eliminarPaciente(cc).subscribe({
      next: (dato) => {
        console.log(dato);
        this.cargarPacientes();
      },
      error: (error) => {
        console.error('Error al eliminar el paciente:', error);
      }
    });
  }
}