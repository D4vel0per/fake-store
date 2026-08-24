import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./AuthService";
import { Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)
    return true

    /*
    if (auth.isAuthenticated()) {
        return true
    }
    return router.parseUrl("/login")*/
}