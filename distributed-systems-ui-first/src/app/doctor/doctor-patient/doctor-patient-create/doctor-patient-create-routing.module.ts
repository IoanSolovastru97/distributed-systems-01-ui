import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Authorization Guardian which allow the user to continue or not
 * if it's a valid user */
import { AuthGuard } from '../../../shared/services/auth.guard.service';
import { DoctorPatientCreateComponent } from './doctor-patient-create/doctor-patient-create.component';

/** Module components */

const routes: Routes = [
  { path: '', component: DoctorPatientCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorPatientCreateRoutingModule { }
