import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./core/auth.guard";

import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RegisterComponent} from "./components/register/register.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
