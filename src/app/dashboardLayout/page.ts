import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CATEGORIES, Product } from "../../types/Product";
import { ProviderService } from "../../services/ProviderService";
import { CartService } from "../../services/CartService";

@Component({
    selector: "dashboard-page",
    styleUrl: "./page.css",
    template: `
        <main class="products-page">
            <h2>Products</h2>

            @if (products.isLoading()) {
                <p class="status">Loading products...</p>
            } @else {
                <section class="product-grid" aria-label="All products">
                    @for (product of productList(); track product.id) {
                        <article class="product-card">
                            <img class="product-image" [src]="product.image" [alt]="product.title">
                            <div class="product-content">
                                <p class="product-id">Product #{{ product.id }}</p>
                                <h3><a [routerLink]="['/dashboard/product', product.id]">{{ product.title }}</a></h3>
                                <p class="product-category"><strong>Category:</strong> {{ product.category }}</p>
                                <p class="product-description"><strong>Description:</strong> {{ product.description }}</p>
                                <p class="product-price"><strong>Price:</strong> {{ product.price }}</p>
                                <div class="cart-actions">
                                    <button class="add-to-cart" type="button" (click)="cartService.addToCart(product)">
                                        Add to cart
                                    </button>
                                    <button
                                        class="remove-from-cart"
                                        type="button"
                                        [disabled]="cartService.count(product.id) === 0"
                                        (click)="cartService.remove(product.id)">
                                        Remove from cart
                                    </button>
                                </div>
                            </div>
                        </article>
                    } @empty {
                        <p class="status">No products found.</p>
                    }
                </section>
            }
        </main>
`,
    imports: [RouterLink]
})
export class DashboardPage {
    providerService = inject(ProviderService);
    cartService = inject(CartService);

    products = this.providerService.currentProducts;
    selectedCategories = this.providerService.currentSelectedCategories;
    searchTerm = this.providerService.currentSearchTerm;
    productList = computed(() => {
        const products = this.products.value() as Product[] | undefined ?? [];
        const categories = this.selectedCategories();
        const searchPattern = new RegExp(this.searchTerm().trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

        return products.filter(product => {
            const matchesCategory = categories.length === 0 || categories.includes(product.category);
            const matchesSearch = searchPattern.test(
                `${product.title} ${product.description} ${product.category}`
            );

            return matchesCategory && matchesSearch;
        });
    });
}