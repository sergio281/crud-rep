import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Medicos } from '../entidades/medicos';
import { MedicosServices } from '../servicios/medicos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-medicos',
  styleUrl: './medicos.css',
  templateUrl: './medicos.html',
})
export class MedicosComponent implements OnInit {
  listaM: Medicos[] = [];
  medico: Medicos = new Medicos();

  constructor(private servicioMedico: MedicosServices, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarMedico();
  }

  listarMedico(): void {
    this.servicioMedico.obtenerMedicos().subscribe(dato => {
      this.listaM = dato;
      this.cdr.markForCheck();
    });
  }

  abrirModal(): void {
    const modal = document.getElementById("registroMedico");
    if (modal != null) modal.style.display = 'block';
  }

  cerrarModal(): void {
    this.medico = new Medicos();
    const modal = document.getElementById("registroMedico");
    if (modal != null) modal.style.display = 'none';
  }

  guardarMedico(): void {
    this.servicioMedico.guardarMedico(this.medico).subscribe({
      next: (respuesta) => {
        console.log('Médico guardado:', respuesta);
        this.listarMedico();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('Error al guardar el médico:', error);
      }
    });
  }
}