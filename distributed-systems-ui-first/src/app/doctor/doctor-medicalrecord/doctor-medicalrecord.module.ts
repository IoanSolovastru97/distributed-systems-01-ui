import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/** Necessary services and interceptors for this module to work properly */
import { AuthInterceptor } from '../../shared/interceptor/http.interceptor';
import { ApiService } from '../../shared/services/api.service';
import { AuthGuard } from '../../shared/services/auth.guard.service';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';

/** Importing SharedModule in order to re-use certain components (from an external module) */
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

/** Module routing and avialable components (at the same module level) */
import { FormsModule } from '@angular/forms';
import { DoctorMedicalrecordComponent } from './doctor-medicalrecord/doctor-medicalrecord.component';
import { DoctorMedicalrecordRoutingModule } from './doctor-medicalrecord-routing.module';

@NgModule({
  declarations: [DoctorMedicalrecordComponent],
  imports: [CommonModule, FormsModule, DoctorMedicalrecordRoutingModule, SharedComponentsModule],
  providers: [
    ApiService,
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

export class DoctorMedicalrecordModule { }
