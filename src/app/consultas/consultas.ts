import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultasService } from '../servicios/consultas';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.html'
})
export class ConsultasComponent {

  medicosConCitas: string[] = [];
  citasPaciente: any[] = [];
  cantidadAsignadas: number | null = null;
  cantidadCanceladas: number | null = null;
  mensajeAsistida: string = '';
  citasPorMedico: any[] = [];
  pacientesAsistieron: number | null = null;
  mensajeAsignacionM: string = '';
  mensajeAsignacionH: string = '';
  promedioEdadCardio: number | null = null;
  bonificaciones: any[] = [];

  constructor(private servicio: ConsultasService) { }

  consultarMedicosConCitas(): void {
    this.servicio.medicosConCitas().subscribe(
      dato => {
        console.log(dato);
        this.medicosConCitas = dato;
      },
      error => console.error('Error en medicosConCitas:', error)
    );
  }

  consultarCitasPaciente(): void {
    const cc = (document.getElementById("cedulaConsulta") as HTMLInputElement).value;
    this.servicio.citasPorPaciente(cc).subscribe(
      dato => {
        console.log(dato);
        this.citasPaciente = dato;
      },
      error => console.error('Error en citasPorPaciente:', error)
    );
  }

  consultarCantidadAsignadas(): void {
    const fecha = (document.getElementById("fechaAsignadas") as HTMLInputElement).value;
    this.servicio.cantidadAsignadas(fecha).subscribe(
      dato => {
        console.log(dato);
        this.cantidadAsignadas = dato;
      },
      error => console.error('Error en cantidadAsignadas:', error)
    );
  }

  consultarCantidadCanceladas(): void {
    const fecha = (document.getElementById("fechaCanceladas") as HTMLInputElement).value;
    this.servicio.cantidadCanceladas(fecha).subscribe(
      dato => {
        console.log(dato);
        this.cantidadCanceladas = dato;
      },
      error => console.error('Error en cantidadCanceladas:', error)
    );
  }

  marcarAsistida(): void {
    const cc = (document.getElementById("cedulaAsistida") as HTMLInputElement).value;
    this.servicio.marcarAsistida(cc).subscribe(
      dato => {
        console.log(dato);
        this.mensajeAsistida = dato;
      },
      error => console.error('Error en marcarAsistida:', error)
    );
  }

  consultarCitasPorMedicoFecha(): void {
    const fecha = (document.getElementById("fechaPorMedico") as HTMLInputElement).value;
    this.servicio.citasPorMedicoFecha(fecha).subscribe(
      dato => {
        console.log(dato);
        this.citasPorMedico = dato;
      },
      error => console.error('Error en citasPorMedicoFecha:', error)
    );
  }

  consultarPacientesAsistieron(): void {
    const fecha = (document.getElementById("fechaAsistieron") as HTMLInputElement).value;
    this.servicio.pacientesAsistieronFecha(fecha).subscribe(
      dato => {
        console.log(dato);
        this.pacientesAsistieron = dato;
      },
      error => console.error('Error en pacientesAsistieronFecha:', error)
    );
  }

  asignarMujeres(): void {
    this.servicio.asignarAutomaticoMujeres().subscribe(
      dato => {
        console.log(dato);
        this.mensajeAsignacionM = dato;
      },
      error => console.error('Error en asignarAutomaticoMujeres:', error)
    );
  }

  asignarHombres(): void {
    this.servicio.asignarAutomaticoHombres().subscribe(
      dato => {
        console.log(dato);
        this.mensajeAsignacionH = dato;
      },
      error => console.error('Error en asignarAutomaticoHombres:', error)
    );
  }

  consultarPromedioCardiologia(): void {
    this.servicio.promedioEdadCardiologia().subscribe(
      dato => {
        console.log(dato);
        this.promedioEdadCardio = dato.promedioEdadMujeresCardiologia;
      },
      error => console.error('Error en promedioEdadCardiologia:', error)
    );
  }

  consultarBonificaciones(): void {
    this.servicio.bonificacionMedicos().subscribe(
      dato => {
        console.log(dato);
        this.bonificaciones = dato;
      },
      error => console.error('Error en bonificacionMedicos:', error)
    );
  }




}