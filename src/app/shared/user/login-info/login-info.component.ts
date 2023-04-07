import {Component, OnInit} from '@angular/core';
import {UserService} from "@shared/user/user.service";
import {LayoutService} from "@shared/layout/layout.service";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:any;

  constructor(
    private userService: UserService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.userService.getLoginInfo().subscribe(user => {
      this.user = user
    })

  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
