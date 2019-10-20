import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

/** Application models:
 * needed for making them available across the entire application */
import { ClientModel } from './shared/models/client.model';

/** Application routing and starting point */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true
    }),
    AppRoutingModule
  ],
  providers: [ClientModel],
  bootstrap: [AppComponent]
})
export class AppModule {}
