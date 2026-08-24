import { computed, Injectable, signal } from "@angular/core";
import { Product } from "../types/Product";

@Injectable({ providedIn: "root" })
export class CartService {
    private products = signal<Product[]>(this.loadProducts());
    currentProducts = this.products.asReadonly();
    productCount = computed(() => this.products().length);
    totalPrice = computed(() => this.products().reduce((total, product) => total + product.price, 0));

    addToCart(product: Product) {
        const products = [...this.products(), product];
        this.products.set(products);
        this.saveProducts(products);
    }

    remove(id: number) {
        const products = [...this.products()];
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            return;
        }

        products.splice(productIndex, 1);
        this.products.set(products);
        this.saveProducts(products);
    }

    removeAll(id: number) {
        const products = this.products().filter(product => product.id !== id);
        this.products.set(products);
        this.saveProducts(products);
    }

    reset() {
        this.products.set([]);
        this.saveProducts([]);
    }

    count(id: number) {
        return this.products().filter(product => product.id === id).length;
    }

    private loadProducts(): Product[] {
        return JSON.parse(localStorage.getItem("cart") || "[]") as Product[];
    }

    private saveProducts(products: Product[]) {
        localStorage.setItem("cart", JSON.stringify(products));
    }
}