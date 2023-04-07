import { Component, OnInit } from '@angular/core';
import {FadeZoomInTop} from "@shared/animations/fade-zoom-in-top.decorator";

@FadeZoomInTop()
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styles: []
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
