import { Routes } from '@angular/router';
import { authGuard } from '../services/auth.guard';
import { AuthLayout } from './authLayout/layout';
import { AuthPage } from './authLayout/page';

export const routes: Routes = [
    {
        path: "login", // Auth Layout
        component: AuthLayout,
        children: [
            {
                path: "", component: AuthPage
            },
            {
                path: "login", component: AuthPage
            }
        ]
    },
    {
        path: "dashboard", // Dashboard layout
        canActivate: [authGuard],
        loadComponent: () => import('./dashboardLayout/layout').then(module => module.DashboardLayout),
        children: [
            {
                path: '',
                loadComponent: () => import('./dashboardLayout/page').then(module => module.DashboardPage)
            },
            {
                path: 'carts',
                loadComponent: () => import('./dashboardLayout/carts').then(module => module.CartsPage)
            },
            {
                path: 'product/:productId',
                loadComponent: () => import('./dashboardLayout/products.detail').then(module => module.ProductDetailPage)
            }
        ]
    },
    { path: "", redirectTo: "/dashboard", pathMatch: 'full' },
    { path: "**", redirectTo: "/dashboard" }
];
