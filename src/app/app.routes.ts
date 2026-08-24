import { Routes } from '@angular/router';
import { authGuard } from '../services/auth.guard';
import { AuthLayout } from './authLayout/layout';
import { DashboardLayout } from './dashboardLayout/layout';
import { AuthPage } from './authLayout/page';
import { DashboardPage } from './dashboardLayout/page';
import { CartsPage } from './dashboardLayout/carts';
import { ProductDetailPage } from './dashboardLayout/products.detail';

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
        component: DashboardLayout,
        children: [
            { path: '', component: DashboardPage },
            { path: 'cart', component: CartsPage },
            { path: 'product/:productId', component: ProductDetailPage }
        ]
    },
    { path: "", redirectTo: "/dashboard", pathMatch: 'full' },
    { path: "**", redirectTo: "/dashboard" }
];
