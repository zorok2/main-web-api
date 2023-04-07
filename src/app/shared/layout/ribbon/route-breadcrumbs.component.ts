import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'sa-route-breadcrumbs',
  template: `
        <ol class="breadcrumb">
           <li [routerLink]="item.routerLink" *ngFor="let item of items">
              <a>{{item?.title}}</a>
           </li>
        </ol>
  `,
  styles: []
})
export class RouteBreadcrumbsComponent implements OnInit, OnDestroy {

  public items: Array<{ title, routerLink }> = [];
  private sub
  private activePages = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.extract(this.router.routerState.root)
    this.sub = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(v => {
        this.items = [];
        this.extract(this.router.routerState.root)
      });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


  extract(route) {
    let pageTitle = route.data.value['pageTitle'];
    if (pageTitle && this.items.indexOf(pageTitle) == -1) {
      if (route.url.value[0]) {
        this.items.push({
          title: route.data.value['pageTitle'],
          routerLink: this.items.length > 0 ? `${this.items[this.items.length - 1].routerLink}/${route.url.value[0].path}` : `/admin/${route.url.value[0].path}`
        })
      }
    }
    if (route.children) {
      route.children.forEach(it => {
        this.extract(it)
      })
    }
  }


}
