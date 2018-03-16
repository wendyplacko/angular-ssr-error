import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecaptchaService } from './recaptcha.service';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'angular-recaptcha-test'}),
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Lf-mkcUAAAAAJJ5aIM56LNrT725TGQ3s4QYQbox',
      } as RecaptchaSettings,
    },
    RecaptchaService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
