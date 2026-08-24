import { Routes } from '@angular/router';
import { authGuard } from '../services/auth.guard';
import { AuthLayout } from './authLayout/layout';
import { DashboardLayout } from './dashboardLayout/layout';
import { AuthPage } from './authLayout/page';
import { DashboardPage } from './dashboardLayout/page';
import { CartsPage } from './dashboardLayout/carts';
import { CartAddPage } from './dashboardLayout/carts.add';
import { CartEditPage } from './dashboardLayout/carts.edit';
import { ProductsPage } from './dashboardLayout/products';
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
            { path: 'carts', component: CartsPage },
            { path: 'carts/add', component: CartAddPage },
            { path: 'carts/edit/:cartId', component: CartEditPage },
            { path: 'products', component: ProductsPage },
            { path: 'products/:productId', component: ProductDetailPage }
        ]
    },
    { path: "", redirectTo: "/dashboard", pathMatch: 'full' },
    { path: "**", redirectTo: "/dashboard" }

];
