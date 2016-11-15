import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './core/auth.guard';
import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AlertModule
  ],
  providers: [AuthService, AuthGuard, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
