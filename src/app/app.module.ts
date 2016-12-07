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
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { routing } from './app.routing';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './core/auth.guard';
import { SocialGuard } from './core/social.guard';
import { HttpService } from './services/http.service';
import { AdminService } from './services/admin.service';
import { SubmissionService } from './admin/submissions/submission.service';
import { UserService } from './shared/user.service';
import { CategoryService } from './admin/categories/category.service';
import { AssessmentService } from './admin/assessments/assessment.service';
import { TaskService } from './admin/tasks/task.service';
import { QuestionService } from './admin/assessments/question.service';
import { NotificationService } from './shared/notification.service';
import { TodoService } from './todos/todo.service';
import { ContributorsService } from './contributions/contributors.service';
import { AssessmentService as UserAssessmentService }  from './assessment/assessment.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './core/admin.guard';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { CategoryFormComponent } from './admin/categories/form/form.component';
import { AssessmentsComponent } from './admin/assessments/assessments.component';
import { AdminAssessmentOpenAnswerForm } from './admin/assessments/form/open-answer.component';
import { ExamAnswerFormComponent } from './admin/assessments/form/exam.component';
import { ListComponent } from './admin/categories/list.component';
import { CreateComponent } from './admin/categories/create.component';
import { EditComponent } from './admin/categories/edit.component';
import { SubmissionsComponent } from './admin/submissions/submissions.component';
import { SingleComponent } from './admin/submissions/single/single.component';
import { LoadingIndicatorComponent } from './shared/loading-indicator.component';
import { PrerequisitesComponent } from './register/steps/prerequisites.component';
import { MainInfoComponent } from './register/steps/main-info.component';
import { TimeInvestmentComponent } from './register/steps/time-investment.component';
import { AdditionalInfoComponent } from './register/steps/additional-info.component';
import { VerifyEmailComponent } from './register/steps/verify-email.component';
import { TodosListComponent } from './todos/list.component';
import { TodoItemComponent } from './todos/item.component';
import { ExperienceBlockComponent } from './components/experience-block/experience-block.component';
import { BonusesComponent } from './admin/bonuses/bonuses.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { BonusFormComponent } from './admin/bonuses/form.component';
import { AssessmentMicroProjectComponent } from './assessment/micro-project/micro-project.component';
import { AssessmentOpenAnswerFormComponent } from './assessment/form/open-answer.component';
import { AssessmentQuestionComponent } from './assessment/question/question.component';
import { AssessmentQuestionCreateComponent } from './assessment/question/create.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AdminAssessmentsListComponent } from './admin/assessments/list.component';
import { CreateMicroProjectAssessmentComponent } from './assessment/micro-project/create.component';
import { AdminAssessmentsMicroProjectComponent } from './admin/assessments/micro-project/micro-project.component';
import { AdminAssessmentsMicroProjectCreateComponent } from './admin/assessments/micro-project/create.component';
import { AdminAssessmentsMicroProjectEditComponent } from './admin/assessments/micro-project/edit.component';
import { FormComponent as ContributionsFormComponent } from './contributions/form.component';
import { AdminAssessmentsQuestionComponent } from './admin/assessments/question/question.component';
import { AdminAssessmentsQuestionCreateComponent } from './admin/assessments/question/create.component';
import { AdminAssessmentsQuestionEditComponent } from './admin/assessments/question/edit.component';
import { AdminAssessmentsExamCreateComponent } from './admin/assessments/exam/create.component';
import { AdminAssessmentsExamComponent } from './admin/assessments/exam/exam.component';
import { AdminAssessmentsExamEditComponent } from './admin/assessments/exam/edit.component';
import { StackOverflowComponent } from './contributions/stack-overflow.component';
import { PublicActivityComponent } from './contributions/public-activity.component';
import { SideProjectComponent } from './contributions/side-project.component';
import { OpenSourceComponent } from './contributions/open-source.component';
import { StatusComponent } from './contributions/status.component';
import { OneSignalNotificationsComponent } from './shared/one-signal-notifications.component';
import { SocialComponent } from './components/social/social.component';

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
    AdminAssessmentOpenAnswerForm,
    ExamAnswerFormComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    SubmissionsComponent,
    SingleComponent,
    LoadingIndicatorComponent,
    PrerequisitesComponent,
    MainInfoComponent,
    TimeInvestmentComponent,
    AdditionalInfoComponent,
    VerifyEmailComponent,
    TodosListComponent,
    TodoItemComponent,
    ExperienceBlockComponent,
    BonusesComponent,
    ContributionsComponent,
    BonusFormComponent,
    AssessmentMicroProjectComponent,
    AssessmentOpenAnswerFormComponent,
    AssessmentQuestionComponent,
    AssessmentQuestionCreateComponent,
    AssessmentComponent,
    AdminAssessmentsListComponent,
    CreateMicroProjectAssessmentComponent,
    AdminAssessmentsMicroProjectComponent,
    AdminAssessmentsMicroProjectCreateComponent,
    AdminAssessmentsMicroProjectEditComponent,
    AdminAssessmentsQuestionComponent,
    AdminAssessmentsQuestionCreateComponent,
    AdminAssessmentsQuestionEditComponent,
    AdminAssessmentsExamCreateComponent,
    AdminAssessmentsExamComponent,
    AdminAssessmentsExamEditComponent,
    ContributionsFormComponent,
    StackOverflowComponent,
    PublicActivityComponent,
    SideProjectComponent,
    OpenSourceComponent,
    StatusComponent,
    OneSignalNotificationsComponent,
    SocialComponent
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
    ToastyModule.forRoot(),
    DragulaModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    HttpService,
    AdminService,
    AdminGuard,
    CategoryService,
    TaskService,
    AssessmentService,
    QuestionService,
    SubmissionService,
    NotificationService,
    UserService,
    DragulaService,
    TodoService,
    ContributorsService,
    UserAssessmentService,
    SocialGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
