import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './core/auth.guard';
import {NoAuthGuard} from './core/no-auth.guard';
import {AdminGuard} from './core/admin.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { AssessmentsComponent } from './admin/assessments/assessments.component';
import { SubmissionsComponent } from './admin/submissions/submissions.component';
import { SingleComponent } from './admin/submissions/single/single.component';
import { BonusesComponent } from './admin/bonuses/bonuses.component';
import {ContributionsComponent} from "./contributions/contributions.component";
import {SocialComponent} from "./components/social/social.component";
import {SocialGuard} from "./core/social.guard";
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

const APP_ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
    {path: 'login/duplicate-email', component: LoginComponent, canActivate: [NoAuthGuard]},
    {path: 'social-login/:user/:token', component: SocialComponent, canActivate: [SocialGuard]},
    {path: 'account/activate/:email/:token', component: AccountActivationComponent},
    {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
    {path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard]},
    {path: 'admin/tasks', component: TasksComponent, canActivate: [AdminGuard]},
    {path: 'admin/assessments', component: AssessmentsComponent, canActivate: [AdminGuard]},
    {path: 'admin/submissions', component: SubmissionsComponent, canActivate: [AdminGuard]},
    {path: 'admin/submissions/:id', component: SubmissionsComponent, canActivate: [AdminGuard]},
    {path: 'admin/submissions/single/:id', component: SingleComponent, canActivate: [AdminGuard]},
    {path: 'admin/bonuses', component: BonusesComponent, canActivate: [AdminGuard]},
    {path: 'contributions', component: ContributionsComponent, canActivate: [AuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
