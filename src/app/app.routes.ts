import { Routes } from '@angular/router';
import { authGuard } from '../services/authGuard';

export const routes: Routes = [
    {
        path: "login", // Auth Layout
        children: [
            {
                path: '', // Auth Component
            },
            {
                path: '**' // Auth Component
            }
        ],
    },
    {
        path: "dashboard", // Dashboard layout
        canActivate:[authGuard],
        children: [
            {
                path: '' // Dashboard Page
            },
            {
                path: 'carts', // Carts Page
                children: [ 
                    { path: 'add' },
                    { path: 'edit/:cartId' }
                ]
            },
            {
                path: 'products', // Products Page
                children: [
                    { path: ':productId' }
                ]
            }
        ]
    },
    { path: "", redirectTo: "dashboard" },
    { path: "**", redirectTo: "dashboard" }

];
