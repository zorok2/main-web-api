import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
