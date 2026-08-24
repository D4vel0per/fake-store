import { computed, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom} from "rxjs";
import { Token } from "../types/Token";

const AUTH_TOKEN_KEY = "authToken";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authSignal = signal<Token|null>(this.loadToken());
    getToken = this.authSignal.asReadonly()
    isAuthenticated = computed(() => !!this.authSignal())
    constructor (private client: HttpClient) {}

    async authenticate (username: string, password: string) {
        const res = this.client.post('https://fakestoreapi.com/auth/login', 
            { username, password },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        try {
            const val = await firstValueFrom(res)
            
            const token = val as Token;
            this.authSignal.set(token);
            this.saveToken(token);
        } catch {
            this.authSignal.set(null)
            this.clearToken();
        }
    }
    async signIn (username: string, password: string) {
        const res = this.client.post('https://fakestoreapi.com/users', 
            { username, password, email: "" },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        try {
            const val = await firstValueFrom(res)
            const token = val as Token;
            this.authSignal.set(token);
            this.saveToken(token);
        } catch {
            this.authSignal.set(null)
            this.clearToken();
        }
    }

    logout() {
        this.authSignal.set(null);
        this.clearToken();
    }

    private loadToken(): Token|null {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

        if (!storedToken) {
            return null;
        }

        try {
            return JSON.parse(storedToken) as Token;
        } catch {
            this.clearToken();
            return null;
        }
    }

    private saveToken(token: Token) {
        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
    }

    private clearToken() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
}