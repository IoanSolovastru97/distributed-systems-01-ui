import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard.service';

import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [{ path: '', component: EmployeeComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export default class AdminRoutingModule {}
