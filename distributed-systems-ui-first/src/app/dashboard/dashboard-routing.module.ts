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
      /** The following will automatically redirect to /clients route
       * whenever the user is logged in and try to go the index (/) route
       * eg. http://localhost:4200/ will send the user to http://localhost:4200/clients */
      // { path: '', redirectTo: 'clients', pathMatch: 'full' },
      // /** '/clients' route path configuration */
      { path: 'patient', loadChildren: '../patient/patient.module#PatientModule' },
      // /** '/admin' route path config */
      // { path: 'admin', loadChildren: '../admin/admin.module#AdminModule' },
      // { path: 'employee', loadChildren: '../admin/admin.module#AdminModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
