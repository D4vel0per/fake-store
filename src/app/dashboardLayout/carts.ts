import { CurrencyPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { CartService } from "../../services/CartService";
import { Product } from "../../types/Product";

@Component({
    selector: "carts-page",
    styleUrl: "./styles/carts.css",
    template: `
        <main class="cart-page">
            <h1>Cart</h1>

            @if (cartItems().length === 0) {
                <p class="empty-cart">Your cart is empty.</p>
            } @else {
                <section class="cart-list" aria-label="Cart products">
                    <div class="cart-header" aria-hidden="true">
                        <span>Product name</span>
                        <span>Price</span>
                        <span>Units</span>
                        <span>Total</span>
                        <span>Actions</span>
                    </div>

                    @for (item of cartItems(); track item.product.id) {
                        <article class="cart-row">
                            <h2>{{ item.product.title }}</h2>
                            <p>{{ item.product.price | currency }}</p>
                            <p>{{ item.units }}</p>
                            <p>{{ item.total | currency }}</p>
                            <div class="cart-actions">
                                <button type="button" (click)="cartService.addToCart(item.product)">
                                    Add one
                                </button>
                                <button type="button" (click)="cartService.remove(item.product.id)">
                                    Remove one
                                </button>
                                <button
                                    class="remove-all"
                                    type="button"
                                    (click)="cartService.removeAll(item.product.id)">
                                    Remove all
                                </button>
                            </div>
                        </article>
                    }
                </section>

                <p class="grand-total">
                    <strong>Grand Total:</strong> {{ cartService.totalPrice() | currency }}
                </p>
            }

            <button class="reset-cart" type="button" (click)="cartService.reset()">
                Reset cart
            </button>
        </main>
    `,
    imports: [CurrencyPipe]
})
export class CartsPage {
    cartService = inject(CartService);

    cartItems = computed(() => {
        const grouped = new Map<number, { product: Product; units: number }>();

        for (const product of this.cartService.currentProducts()) {
            const item = grouped.get(product.id);
            grouped.set(product.id, {
                product,
                units: (item?.units ?? 0) + 1
            });
        }

        return Array.from(grouped.values()).map(item => ({
            ...item,
            total: item.product.price * item.units
        }));
    });

}