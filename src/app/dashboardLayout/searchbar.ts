import { Component, output } from "@angular/core";
import { CATEGORIES } from "../../types/Product";
import { TitleCasePipe } from "@angular/common";

@Component({
    selector: "searchbar",
    template: `
    <div class="searchbar">
        <input
            type="search"
            placeholder="Search products"
            (input)="handleSearch($event)" />
        <button
            type="button"
            class="category-button"
            aria-label="Select product categories"
            (click)="toggleCategories()">
            Categories
        </button>
        @if (categoriesOpen) {
            <div class="category-menu">
                @for (category of categoryOptions; track category) {
                    <label>
                        <input
                            type="checkbox"
                            [checked]="selectedCategories.includes(category)"
                            (change)="toggleCategory(category)" />
                        {{ category | titlecase}}
                    </label>
                }
            </div>
        }
    </div>
    `,
    styleUrl: "./styles/searchbar.css",
    imports: [TitleCasePipe]
})
export class SearchbarComponent {
    categoryOptions = [
        CATEGORIES.ELECTRONICS,
        CATEGORIES.JEWEL,
        CATEGORIES.MEN,
        CATEGORIES.WOMAN
    ];
    selectedCategories: CATEGORIES[] = [];
    categoriesOpen = false;
    categoriesChanged = output<CATEGORIES[]>();
    searchTermChanged = output<string>();

    toggleCategories() {
        this.categoriesOpen = !this.categoriesOpen;
    }

    handleSearch(event: Event) {
        this.searchTermChanged.emit((event.target as HTMLInputElement).value);
    }

    toggleCategory(category: CATEGORIES) {
        if (this.selectedCategories.includes(category)) {
            this.selectedCategories = this.selectedCategories.filter(
                selectedCategory => selectedCategory !== category
            );
        } else {
            this.selectedCategories = [...this.selectedCategories, category];
        }

        this.categoriesChanged.emit([...this.selectedCategories]);
    }
}