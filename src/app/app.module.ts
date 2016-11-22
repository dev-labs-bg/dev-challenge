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
import { SubmissionService } from './admin/submissions/submission.service';
import { CategoryService } from './admin/categories/category.service';
import { TaskService } from './services/task.service';
import { QuestionService } from './services/question.service';
import { AssessmentTypeService } from './services/assessment-type.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/admin.guard';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { AdminTasksComponent } from './admin/admin-tasks/admin-tasks.component';
import { CategoryFormComponent } from './admin/categories/form/form.component';
import { AssessmentsComponent } from './admin/assessments/assessments.component';
import { OpenAnswerFormComponent } from './admin/assessments/open-answer-form/open-answer-form.component';
import { ExamAnswerFormComponent } from './admin/assessments/exam-answer-form/exam-answer-form.component';
import { ListComponent } from './admin/categories/list.component';
import { CreateComponent } from './admin/categories/create.component';
import { EditComponent } from './admin/categories/edit.component';
import { SubmissionsComponent } from './admin/submissions/submissions.component';

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
    AssessmentsComponent,
    OpenAnswerFormComponent,
    ExamAnswerFormComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    SubmissionsComponent
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
    TaskService,
    AssessmentTypeService,
    QuestionService,
    SubmissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
