import { Routes } from '@angular/router';
import { PacientesComponent } from './pacientes/pacientes';
import { MedicosComponent } from './medicos/medicos';
import { SolicitarCitaComponent } from './citas/citas';
import { ConsultasComponent } from './consultas/consultas';

export const routes: Routes = [
    { path: '', redirectTo: '/Pacientes', pathMatch: 'full' },
    { path: "Pacientes", component: PacientesComponent },
    { path: "Medicos", component: MedicosComponent },
    { path: 'Citas', component: SolicitarCitaComponent },
    { path: 'Consultas', component: ConsultasComponent }
];