import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// 3rd party plugins
import { ToastyModule } from 'ng2-toasty';
import { BusyModule } from 'angular2-busy';
import {
    AlertModule, DatepickerModule, ModalModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './core/auth.guard';
import { HttpService } from './services/http.service';
import { AdminService } from './services/admin.service';
import { CategoryService } from './admin/categories/category.service';
import { AssessmentTypeService } from './admin/tasks/assessment-type.service';
import { TaskService } from './admin/tasks/task.service';
import { QuestionService } from './admin/assessments/question.service';
import { NotificationService } from './shared/notification.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/admin.guard';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { CategoryFormComponent } from './admin/categories/form/form.component';
import { AssessmentsComponent } from './admin/assessments/assessments.component';
import { OpenAnswerFormComponent } from './admin/assessments/open-answer-form/open-answer-form.component';
import { ExamAnswerFormComponent } from './admin/assessments/exam-answer-form/exam-answer-form.component';
import { ListComponent } from './admin/categories/list.component';
import { CreateComponent } from './admin/categories/create.component';
import { EditComponent } from './admin/categories/edit.component';
import { LoadingIndicatorComponent } from './shared/loading-indicator.component';
import { PrerequisitesComponent } from './register/steps/prerequisites.component';
import { MainInfoComponent } from './register/steps/main-info.component';
import { TimeInvestmentComponent } from './register/steps/time-investment.component';
import { AdditionalInfoComponent } from './register/steps/additional-info.component';
import { VerifyEmailComponent } from './register/steps/verify-email.component';


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
    TasksComponent,
    CategoryFormComponent,
    AssessmentsComponent,
    OpenAnswerFormComponent,
    ExamAnswerFormComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoadingIndicatorComponent,
    PrerequisitesComponent,
    MainInfoComponent,
    TimeInvestmentComponent,
    AdditionalInfoComponent,
    VerifyEmailComponent
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
    QuestionService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
