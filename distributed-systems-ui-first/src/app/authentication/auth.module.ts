// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Storage Service
import { StorageService } from '../shared/services/storage.service';
// Auth Module dependencies
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, AuthRoutingModule, SharedComponentsModule],
  declarations: [LoginComponent],
  providers: [StorageService],
  exports: []
})
export class AuthModule {}
