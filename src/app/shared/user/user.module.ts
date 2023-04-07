import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginInfoComponent } from '@shared/user/login-info/login-info.component'
import { LogoutComponent } from '@shared/user/logout/logout.component'
import { AuthService } from '@components/auth/auth.service'

@NgModule({
  imports: [CommonModule],
  declarations: [LoginInfoComponent, LogoutComponent],
  exports: [LoginInfoComponent, LogoutComponent],
  providers: [AuthService],
})
export class UserModule {}
