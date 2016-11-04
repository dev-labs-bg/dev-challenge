import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './components/login/login.component';
// TODO: import { DashboardComponent } from './components/dashboard/dashboard.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}//,
    // TODO: {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
