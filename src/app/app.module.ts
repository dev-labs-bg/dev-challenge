import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AlertModule, DatepickerModule, ModalModule} from 'ng2-bootstrap/ng2-bootstrap';

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
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from "./core/admin.guard";
import { AdminCategoriesComponent } from './admin/categories/admin-categories.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { CategoryService } from "./services/category.service";
import { CategoryFormComponent } from './admin/categories/form/category-form.component';
import { CategoryFormService } from './admin/categories/form/category-form.service';
import { TaskService } from './services/task.service';
import { AssessmentTypeService } from './services/assessment-type.service';

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
    AdminTasksComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AlertModule,
    DatepickerModule,
    ModalModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    HttpService,
    AdminService,
    AdminGuard,
    CategoryService,
    CategoryFormService,
    TaskService,
    AssessmentTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
