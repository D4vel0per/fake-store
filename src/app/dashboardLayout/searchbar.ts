import { Component, output } from "@angular/core";

const CATEGORY_OPTIONS = ["Vintage", "Modern", "New-Style"] as const;
type Category = typeof CATEGORY_OPTIONS[number];

@Component({
    selector: "searchbar",
    template: `
    <div class="searchbar">
        <input type="search" placeholder="Search products" />
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
                        {{ category }}
                    </label>
                }
            </div>
        }
    </div>
    `,
    styleUrl: "./styles/searchbar.css"
})
export class SearchbarComponent {
    categoryOptions = CATEGORY_OPTIONS;
    selectedCategories: Category[] = [];
    categoriesOpen = false;
    categoriesChanged = output<string[]>();

    toggleCategories() {
        this.categoriesOpen = !this.categoriesOpen;
    }

    toggleCategory(category: Category) {
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