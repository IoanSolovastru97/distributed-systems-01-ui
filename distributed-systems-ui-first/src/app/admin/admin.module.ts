import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '../shared/services/auth.guard.service';
import { AuthService } from '../shared/services/auth.service';
import { StorageService } from '../shared/services/storage.service';
import { AuthInterceptor } from '../shared/interceptor/http.interceptor';

import AdminRoutingModule from './admin-routing.module';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [CommonModule, HttpClientModule, AdminRoutingModule],
  providers: [
    AuthGuard,
    AuthService,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AdminModule {}
