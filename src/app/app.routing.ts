import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./core/auth.guard";
import {AdminGuard} from "./core/admin.guard";

import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RegisterComponent} from "./components/register/register.component";
import {AccountActivationComponent} from "./components/account-activation/account-activation.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminCategoriesComponent} from "./admin/admin-categories/admin-categories.component";
import {AdminTasksComponent} from "./admin/admin-tasks/admin-tasks.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'account/activate/:email/:token', component: AccountActivationComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
    {path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminGuard]},
    {path: 'admin/tasks', component: AdminTasksComponent, canActivate: [AdminGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
