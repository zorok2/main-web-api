import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "@shared/user/login-info/login-info.component";
import { MenuAuthen } from '@util/variable';


@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  private menu = MenuAuthen;

  constructor() {
  }

  ngOnInit() {
  }

}
