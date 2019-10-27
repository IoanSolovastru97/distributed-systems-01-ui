import { NgModule } from '@angular/core';

/** Authorization Guardian which allow the user to continue or not
 * if it's a valid user */
import { AuthGuard } from '../../../shared/services/auth.guard.service';
import { DoctorPatientEdit } from './doctor-patient-edit.component';
import { RouterModule, Routes } from '@angular/router';

/** Module components */

const routes: Routes = [
    {
        // path: `/doctor/patient/edit/:username`,
        path: '',
        component: DoctorPatientEdit,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorPatientEditRoutingModule { }
