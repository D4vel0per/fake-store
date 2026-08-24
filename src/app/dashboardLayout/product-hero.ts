import { CurrencyPipe, TitleCasePipe } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { CartService } from "../../services/CartService";
import { Product } from "../../types/Product";

@Component({
    selector: "product-hero",
    styleUrl: "./product-hero.css",
    template: `
        <main class="product-detail">
            <div class="product-detail-image">
                <img [src]="product().image" [alt]="product().title">
            </div>
            <div class="product-detail-content">
                <p class="product-id">Product #{{ product().id }}</p>
                <h1>{{ product().title }}</h1>
                <p><strong>Category:</strong> {{ product().category | titlecase }}</p>
                <p><strong>Description:</strong> {{ product().description }}</p>
                <p class="product-price"><strong>Price:</strong> {{ product().price | currency }}</p>
                <p class="cart-units"><strong>Units in cart:</strong> {{ cartService.count(product().id) }}</p>
                <div class="cart-actions">
                    <button type="button" (click)="cartService.addToCart(product())">Add to cart</button>
                    <button
                        type="button"
                        [disabled]="cartService.count(product().id) === 0"
                        (click)="cartService.remove(product().id)">
                        Remove one
                    </button>
                </div>
            </div>
        </main>
    `,
    imports: [CurrencyPipe, TitleCasePipe]
})
export class ProductHeroComponent {
    product = input.required<Product>();
    cartService = inject(CartService);
}
