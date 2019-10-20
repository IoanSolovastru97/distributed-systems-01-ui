import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/** Importing Services and HTTP Interceptor */
import { AuthGuard } from '../shared/services/auth.guard.service';
import { AuthService } from '../shared/services/auth.service';
import { StorageService } from '../shared/services/storage.service';
import { AuthInterceptor } from '../shared/interceptor/http.interceptor';

/** Importing shared stuff here */
import { SharedComponentsModule } from '../shared/components/shared-components.module';

/** Importing Dashboard Router and Components */
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './main/main.component';
import { DashboardHeaderComponent } from './header/header.component';

/** Declaring/configuring the Dashboard Module */
@NgModule({
  declarations: [DashboardHeaderComponent, DashboardMainComponent],
  imports: [CommonModule, HttpClientModule, SharedComponentsModule, DashboardRoutingModule],
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
export class DashboardModule {}
