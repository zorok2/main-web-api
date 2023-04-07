import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginModule as LoginModuleChild } from 'app/components/auth/login/login.module'
import { LoginPage } from 'app/pages/auth/login/admin/login.component'
import { LoginRoutingModule } from 'app/pages/auth/login/login-routing.module'

@NgModule({
  imports: [LoginRoutingModule, LoginModuleChild],
  declarations: [LoginPage],
})
export class LoginModule {}
