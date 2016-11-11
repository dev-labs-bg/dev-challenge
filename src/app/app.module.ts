import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AlertModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './core/auth.guard';
import { HttpService } from './services/http.service';
import { AdminService } from './services/admin.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AdminComponent } from './components/admin/admin.component';
import {AdminGuard} from "./core/admin.guard";
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminTasksComponent } from './components/admin/admin-tasks/admin-tasks.component';
import { CategoryService } from "./services/category.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    RegisterComponent,
    AccountActivationComponent,
    AdminComponent,
    AdminCategoriesComponent,
    AdminTasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AlertModule,
    DatepickerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    HttpService,
    AdminService,
    AdminGuard,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
