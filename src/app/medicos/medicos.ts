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
  bandera: boolean = false;   // false = Registrar, true = Actualizar

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
    this.bandera = false;
    const modal = document.getElementById("registroMedico");
    if (modal != null) modal.style.display = 'none';
  }

  nuevoMedico(): void {
    this.medico = new Medicos();
    this.bandera = false;
    this.abrirModal();
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

  actualizar(m: Medicos): void {
    this.medico = { ...m };
    this.bandera = true;
    this.abrirModal();
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este médico?')) return;

    this.servicioMedico.eliminarMedico(id).subscribe({
      next: (dato) => {
        console.log(dato);
        this.listarMedico();
      },
      error: (error) => {
        console.error('Error al eliminar el médico:', error);
      }
    });
  }

  buscarMedico(): void {
    const id = (document.getElementById("idMedico") as HTMLInputElement).value;

    this.servicioMedico.buscarMedico(id).subscribe(
      dato => {
        console.log(dato);
        this.listaM = [dato];
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al buscar el médico:', error);
        alert("No se encontró el médico con el id ingresado.");
      }
    );
  }
}