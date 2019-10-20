import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/** Necessary services and interceptors for this module to work properly */
import { AuthInterceptor } from '../shared/interceptor/http.interceptor';
import { ApiService } from '../shared/services/api.service';
import { AuthGuard } from '../shared/services/auth.guard.service';
import { AuthService } from '../shared/services/auth.service';
import { StorageService } from '../shared/services/storage.service';

/** Importing SharedModule in order to re-use certain components (from an external module) */
import { SharedComponentsModule } from '../shared/components/shared-components.module';

/** Module routing and avialable components (at the same module level) */
import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientItemComponent } from './client-list/client-item/client-item.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientListComponent, ClientItemComponent, ClientDetailsComponent],
  imports: [CommonModule, FormsModule, ClientRoutingModule, SharedComponentsModule],
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
export class ClientModule {}
