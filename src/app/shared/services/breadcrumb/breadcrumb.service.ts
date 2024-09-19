import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbTrail: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  getBreadcrumbTrail(): any[] {
    this.breadcrumbTrail = [];
    this.buildBreadcrumbTrail(this.activatedRoute.root);
    // return dublicates, for testing nested routes,because we have only dashboard route;
    return [...this.breadcrumbTrail, ...this.breadcrumbTrail];
  }

  private buildBreadcrumbTrail(route: ActivatedRoute): void {
    const routePath = route.routeConfig?.path || '';
    if (routePath) {
      this.breadcrumbTrail.push(routePath);
    }
    if (route.firstChild) {
      this.buildBreadcrumbTrail(route.firstChild);
    }
  }
}
