import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import { OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { CommonModule } from '@angular/common';


const config = {
  issuer: "https://dev-981095.oktapreview.com/oauth2/default",
  redirectUri: "http://localhost:4200/implicit/callback", 
  clientId: "0oaglcbg5jEEIJQN20h7"
}

const appRoutes: Routes = [
  {
    path: '', 
    component: HomeComponent
  }, 
  {
    path: 'login', 
    component: LoginComponent
  }, 
  {
    path: 'register', 
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule, 
    FormsModule,
    HttpModule,
    CommonModule,
    OktaAuthModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, OktaAuthService, OktaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
