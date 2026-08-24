import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { SearchbarComponent } from "./searchbar";

@Component({
    selector: "dashboard",
    template: `
    <header class="dashboard-header">
        <a routerLink="/dashboard/carts">Cart</a>
        <searchbar (categoriesChanged)="handleCategoriesChanged($event)" />
        <a class="profile-link">Profile</a>
    </header>
    <h1>Dashboard</h1>
    <router-outlet />
`,
    styleUrl: "./styles/layout.css",
    imports: [RouterLink, RouterOutlet, SearchbarComponent]
})
export class DashboardLayout {
    selectedCategories: string[] = [];

    handleCategoriesChanged(categories: string[]) {
        this.selectedCategories = categories;
    }
}