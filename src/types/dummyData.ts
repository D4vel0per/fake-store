import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Cart } from "./Cart";
import { Product } from "./Product";
import { User } from "./User";

const PRODUCTS: Product[] = [
	{
		id: 1,
		title: "Canvas travel backpack",
		price: 54.99,
		category: "Modern",
		description: "A durable everyday backpack with room for a laptop and travel essentials.",
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 2,
		title: "Ceramic coffee set",
		price: 32.5,
		category: "Vintage",
		description: "A two-cup ceramic set with a hand-finished glaze and warm neutral tones.",
		image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"
	},
	{
		id: 3,
		title: "Minimal desk lamp",
		price: 68,
		category: "New-Style",
		description: "An adjustable desk lamp designed for focused work and soft evening light.",
		image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
	}
];

const USERS: User[] = [
	{
		id: 1,
		email: "alex.morgan@example.com",
		username: "alexmorgan",
		password: "password",
		name: { firstname: "Alex", lastname: "Morgan" },
		address: {
			city: "Portland",
			street: "Oak Street",
			number: 18,
			zipcode: "97205",
			geolocation: { lat: "45.5231", long: "-122.6765" }
		},
		phone: "555-0101"
	},
	{
		id: 2,
		email: "jamie.lee@example.com",
		username: "jamielee",
		password: "password",
		name: { firstname: "Jamie", lastname: "Lee" },
		address: {
			city: "Austin",
			street: "Congress Avenue",
			number: 204,
			zipcode: "78701",
			geolocation: { lat: "30.2672", long: "-97.7431" }
		},
		phone: "555-0102"
	}
];

const CARTS: Cart[] = [
	{
		id: 1,
		userId: 1,
		date: new Date("2026-08-10"),
		products: [
			{ productId: 1, quantity: 1 },
			{ productId: 2, quantity: 2 }
		]
	},
	{
		id: 2,
		userId: 2,
		date: new Date("2026-08-18"),
		products: [{ productId: 3, quantity: 1 }]
	}
];

@Injectable({ providedIn: "root" })
export class Dummy {
	private products = PRODUCTS.map(product => ({ ...product }));
	private carts = CARTS.map(cart => this.cloneCart(cart));

	getProducts(): Observable<Product[]> {
		return of(this.products.map(product => ({ ...product })));
	}

	login(username: string, password: string): Observable<User> {
		const user = USERS.find(
			currentUser => currentUser.username === username && currentUser.password === password
		);

		return user
			? of(this.cloneUser(user))
			: throwError(() => new Error("Invalid username or password."));
	}

	getCart(userId: number): Observable<Cart> {
		const cart = this.carts.find(currentCart => currentCart.userId === userId);
		return cart
			? of(this.cloneCart(cart))
			: throwError(() => new Error(`Cart for user ${userId} was not found.`));
	}

	private cloneCart(cart: Cart): Cart {
		return {
			...cart,
			date: new Date(cart.date),
			products: cart.products.map(product => ({ ...product }))
		};
	}

	private cloneUser(user: User): User {
		return {
			...user,
			name: { ...user.name },
			address: {
				...user.address,
				geolocation: { ...user.address.geolocation }
			}
		};
	}
}
