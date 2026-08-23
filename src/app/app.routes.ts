import { Routes } from '@angular/router';

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
                    { path: 'add' },
                    { path: 'edit/:productId' }
                ]
            }
        ]
    },
    { path: "", redirectTo: "dashboard" },
    { path: "**", redirectTo: "dashboard" }

];
