import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../../../components/auth/login/login.component'
import { LoginPage } from 'app/pages/auth/login/admin/login.component'
// import { UserForgotPasswordComponent } from 'app/components/login/forgot-password/user-forgot-password.component'
// import { UserResetPasswordComponent } from 'app/components/login/reset-password/user-reset-password.component'
// import { ResetPasswordGuard } from 'app/guards/reset-password.guard'

/*
* @author Thành(22/11/2017)
*/
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      // { path: 'forgot-password', component: UserForgotPasswordComponent },
      // {
      //   path: 'reset-password',
      //   component: UserResetPasswordComponent,
      //   canActivate: [ResetPasswordGuard],
      // },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
