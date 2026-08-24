import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { ProviderService } from "../../services/ProviderService";
import { Product } from "../../types/Product";
import { ProductHeroComponent } from "./product-hero";
import { ProductRelatedComponent } from "./product-related";

@Component({
    selector: "product-detail-page",
    template: `
        @if (products.isLoading()) {
            <p class="status">Loading product...</p>
        } @else if (product(); as selectedProduct) {
            <product-hero [product]="selectedProduct" />
            <product-related [products]="relatedProducts()" />
        } @else {
            <p class="status">Product not found.</p>
        }
    `,
    imports: [ProductHeroComponent, ProductRelatedComponent]
})
export class ProductDetailPage {
    private route = inject(ActivatedRoute);
    private providerService = inject(ProviderService);
    products = this.providerService.currentProducts;
    private productId = toSignal(
        this.route.paramMap.pipe(map(params => Number(params.get("productId")))),
        { initialValue: Number(this.route.snapshot.paramMap.get("productId")) }
    );
    product = computed(() => {
        const products = this.products.value() as Product[] | undefined ?? [];

        return products.find(product => product.id === this.productId());
    });

    relatedProducts = computed(() => {
        const selectedProduct = this.product();
        const products = this.products.value() as Product[] | undefined ?? [];

        if (!selectedProduct) {
            return [];
        }

        return products.filter(product =>
            product.id !== selectedProduct.id && product.category === selectedProduct.category
        );
    });

}