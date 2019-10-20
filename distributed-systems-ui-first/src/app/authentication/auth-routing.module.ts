import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
