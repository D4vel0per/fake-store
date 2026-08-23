import { Service, signal } from "@angular/core";

@Service()
export class AuthService {
    private authenticated = false;
    isAuthenticated () {
        return this.authenticated
    }
    async authenticate (username: string, password: string) {
        const res =await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username, password
            })
        })
        if (!res.ok) {
            this.authenticated = false; return;
        }
        this.authenticated = true;
    }

}