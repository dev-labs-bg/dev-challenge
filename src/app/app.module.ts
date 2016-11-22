import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// 3rd party plugins
import { ToastyModule } from 'ng2-toasty';
import { BusyModule } from 'angular2-busy';
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
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from "./core/admin.guard";
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { CategoryService } from "./admin/categories/category.service";
import { CategoryFormComponent } from './admin/categories/form/form.component';
import { TaskService } from './services/task.service';
import { AssessmentTypeService } from './services/assessment-type.service';
import { ListComponent } from './admin/categories/list.component';
import { CreateComponent } from './admin/categories/create.component';
import { EditComponent } from './admin/categories/edit.component';

import { NotificationService } from './shared/notification.service';
import { LoadingIndicatorComponent } from './shared/loading-indicator.component';

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
    CategoryFormComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AlertModule,
    DatepickerModule,
    ModalModule,
    BusyModule,
    ToastyModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    HttpService,
    AdminService,
    AdminGuard,
    CategoryService,
    TaskService,
    AssessmentTypeService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
