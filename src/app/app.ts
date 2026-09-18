import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes';
import { Navegacion } from './navegacion/navegacion';
import { SolicitarCitaComponent } from './citas/citas';

@Component({
  imports: [RouterOutlet,PacientesComponent,Navegacion,SolicitarCitaComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('eps');
}
