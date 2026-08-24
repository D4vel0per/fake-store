import { CurrencyPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Product } from "../../types/Product";

@Component({
    selector: "product-related",
    styleUrl: "./product-related.css",
    template: `
        <section class="related-products" aria-labelledby="related-heading">
            <h2 id="related-heading">Related</h2>
            <div class="related-grid">
                @for (relatedProduct of products(); track relatedProduct.id) {
                    <article class="related-card">
                        <img [src]="relatedProduct.image" [alt]="relatedProduct.title">
                        <a [routerLink]="['/dashboard/product', relatedProduct.id]">
                            {{ relatedProduct.title }}
                        </a>
                        <p>{{ relatedProduct.price | currency }}</p>
                    </article>
                } @empty {
                    <p class="status">No related products found.</p>
                }
            </div>
        </section>
    `,
    imports: [CurrencyPipe, RouterLink]
})
export class ProductRelatedComponent {
    products = input.required<Product[]>();
}
