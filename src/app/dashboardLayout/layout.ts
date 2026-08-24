import { Component, inject } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { SearchbarComponent } from "./searchbar";
import { CATEGORIES } from "../../types/Product";
import { ProviderService } from "../../services/ProviderService";
import { CartService } from "../../services/CartService";
import { AuthService } from "../../services/AuthService";

@Component({
    selector: "dashboard",
    template: `
    <header class="dashboard-header">
        <a routerLink="/dashboard">Catalog</a>
        <a routerLink="/dashboard/carts">
            Cart <span class="cart-count">({{ cartService.productCount() }})</span>
            <span class="cart-total">{{ cartService.totalPrice() | currency }}</span>
        </a>
        <searchbar
            (categoriesChanged)="handleCategoriesChanged($event)"
            (searchTermChanged)="handleSearchTermChanged($event)" />
        <button class="logout-button" type="button" (click)="logout()">Logout</button>
    </header>
    <h1>Dashboard <span class="selected-count">({{ cartService.productCount() }} products selected)</span></h1>
    <router-outlet />
`,
    styleUrl: "./styles/layout.css",
    imports: [RouterLink, RouterOutlet, SearchbarComponent, CurrencyPipe]
})
export class DashboardLayout {
    private providerService = inject(ProviderService);
    cartService = inject(CartService);
    private authService = inject(AuthService);
    private router = inject(Router);

    handleCategoriesChanged(categories: CATEGORIES[]) {
        this.providerService.setSelectedCategories(categories);
    }

    handleSearchTermChanged(searchTerm: string) {
        this.providerService.setSearchTerm(searchTerm);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
}