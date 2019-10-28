import { NgModule } from '@angular/core';

/** Authorization Guardian which allow the user to continue or not
 * if it's a valid user */
import { AuthGuard } from '../../../shared/services/auth.guard.service';
import { DoctorCaregiverEdit } from './doctor-caregiver-edit.component';
import { RouterModule, Routes } from '@angular/router';

/** Module components */

const routes: Routes = [
    {
        // path: `/doctor/patient/edit/:username`,
        path: '',
        component: DoctorCaregiverEdit,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorCaregiverEditRoutingModule { }
