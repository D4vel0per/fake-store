import { computed, inject, Injectable, Service, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, firstValueFrom, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authSignal = signal<boolean>(false);
    isAuthenticated = this.authSignal.asReadonly();
    constructor (private client: HttpClient) {}

    async authenticate (username: string, password: string) {
        const res = this.client.post('https://fakestoreapi.com/auth/login', 
            { username, password },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        try {
            await firstValueFrom(res)
            this.authSignal.set(true)
        } catch {
            this.authSignal.set(false)
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
            await firstValueFrom(res)
            this.authSignal.set(true)
        } catch {
            this.authSignal.set(false)
        }
        
    }
}