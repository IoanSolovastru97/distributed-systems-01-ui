import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** The AuthGuard service will determinate whther if the user
 * as access to continue or not */
import { AuthGuard } from '../shared/services/auth.guard.service';

/** Importing the starting point for Dashboard module */
import { DashboardMainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
    canActivate: [AuthGuard],
    children: [
      /** The following will automatically redirect to /patient route
       * whenever the user is logged in and try to go the index (/) route
       * eg. http://localhost:4200/ will send the user to http://localhost:4200/clients */
      // { path: '', redirectTo: 'patient', pathMatch: 'full' },patient
      // /** '/patient' route path configuration */
      { path: 'patient', loadChildren: '../patient/patient.module#PatientModule' },
      // /** '/admin' route path config */
      { path: 'caregiver', loadChildren: '../caregiver/caregiver.module#CaregiverModule' },
      { path: 'doctor', loadChildren: '../doctor/doctor.module#DoctorModule' },
      { path: 'doctor/patient', loadChildren: '../doctor/doctor-patient/doctor-patient.module#DoctorPatientModule' },
      { path: 'doctor/patient/create', loadChildren: '../doctor/doctor-patient/doctor-patient-create/doctor-patient-create.module#DoctorPatientCreateModule' },
      { path: 'doctor/patient/edit', loadChildren: '../doctor/doctor-patient/doctor-patient-edit/doctor-patient-edit.module#DoctorPatientEditModule' },
      { path: 'doctor/caregiver', loadChildren: '../doctor/doctor-caregiver/doctor-caregiver.module#DoctorCaregiverModule' },
      { path: 'doctor/caregiver/create', loadChildren: '../doctor/doctor-caregiver/doctor-caregiver-create/doctor-caregiver-create.module#DoctorCaregiverCreateModule' },
      { path: 'doctor/caregiver/edit', loadChildren: '../doctor/doctor-caregiver/doctor-caregiver-edit/doctor-caregiver-edit.module#DoctorCaregiverEditModule' },
      { path: 'doctor/caregiver', loadChildren: '../doctor/doctor-caregiver/doctor-caregiver.module#DoctorCaregiverModule' },
      { path: 'doctor/medicalplan', loadChildren: '../doctor/doctor-medicalplan/doctor-medicalplan.module#DoctorMedicalplanModule' },
      // { path: 'employee', loadChildren: '../admin/admin.module#AdminModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
