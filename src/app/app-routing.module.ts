import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../app/components/sign-in/sign-in.component'
import { SignUpComponent } from '../app/components/sign-up/sign-up.component'
import { DashboardComponent } from '../app/components/dashboard/dashboard.component'
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component'
import { AuthGuard } from '../app/shared/guard/auth.guard'
import { VerifyEmailComponent } from '../app/components/verify-email/verify-email.component'
import { AddTravelComponent } from './components/add-travel/add-travel.component';
import { TravelListComponent } from './components/travel-list/travel-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyTravelComponent } from './components/my-travel/my-travel.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'add-travel', component: AddTravelComponent},
  { path: 'travels', component: TravelListComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'myTravel', component: MyTravelComponent},
  { path: '**', redirectTo: 'dashboard' },
  { path: '', redirectTo: '#', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
