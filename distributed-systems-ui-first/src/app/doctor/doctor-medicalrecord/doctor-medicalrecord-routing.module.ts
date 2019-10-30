import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Authorization Guardian which allow the user to continue or not
 * if it's a valid user */
import { AuthGuard } from '../../shared/services/auth.guard.service';
import { DoctorMedicalrecordComponent } from './doctor-medicalrecord/doctor-medicalrecord.component';

/** Module components */

const routes: Routes = [
  { path: '', component: DoctorMedicalrecordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorMedicalrecordRoutingModule { }
