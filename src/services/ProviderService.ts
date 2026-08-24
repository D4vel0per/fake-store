import { computed, inject, Injectable, signal } from "@angular/core";
import { CATEGORIES, Product } from "../types/Product";
import { Cart } from "../types/Cart";
import { rxResource } from "@angular/core/rxjs-interop";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./AuthService";

@Injectable({
    providedIn: "root"
})
export class ProviderService {
    constructor(
        private http: HttpClient
    ) {}

    authService = inject(AuthService)
    

    private products = rxResource({
        stream: () => { 
            return this.http.get('https://fakestoreapi.com/products')
        }
    })
    private carts = rxResource({
        stream: () => { 
            return this.http.get('https://fakestoreapi.com/carts/1')
        }
    })

    currentCart = this.carts.asReadonly()

    currentProducts = this.products.asReadonly()

    private selectedCategories = signal<CATEGORIES[]>([]);
    currentSelectedCategories = this.selectedCategories.asReadonly();
    private searchTerm = signal("");
    currentSearchTerm = this.searchTerm.asReadonly();

    setSelectedCategories(categories: CATEGORIES[]) {
        this.selectedCategories.set(categories);
    }

    setSearchTerm(searchTerm: string) {
        this.searchTerm.set(searchTerm);
    }

}