import { Component, inject, output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/AuthService";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop";

interface UserLogin {
    username: string
    password: string
}

@Component({
    selector: "login",
    template: `
    <div class="top-container">
        <h3>Login</h3>
    </div>
    <form [formGroup]=formGroup (ngSubmit)="handleSubmit()" (input)="handleChange()">
        <label for="username" class="column left">
            Username
            <input id='username' type="text" formControlName=username placeholder="Enter your username" /> 
        </label>
        <label for="password" class="column left">
            Password
            <input id='password' type="password" formControlName=password placeholder="Enter your password" /> 
        </label>
        <button type="submit">Submit</button>
    </form>
    <div class="bottom-container">
        @if (error()) {
            <span class="error-message">There was an error trying to log in into your account.</span>
        } @else {
            <span>Do you not have an account? <span (click)="handleToggle()">Create one!</span></span>
        }
    </div>
    `,
    styleUrl: "./styles.css",
    imports: [ ReactiveFormsModule ]
})
export class LoginComponent {
    loginService = inject(AuthService)
    router = inject(Router)
    error = signal<boolean>(false)
    toggle = output()
    formGroup = new FormGroup({
        username: new FormControl('', [ Validators.required, Validators.pattern(/^[a-z0-9\.\-\$]+$/i) ]),
        password: new FormControl('', [ Validators.required, Validators.pattern(/^[a-z0-9\.\-\$]+$/i) ])
    })
    handleToggle () {
        this.toggle.emit()
    }
    handleChange () {
        if (this.error) this.error.set(false)
    }

    async handleSubmit () {
        const val = this.formGroup.value
        if (!val.username || !val.password) return;
        if (!this.formGroup.valid) return;

        await this.loginService.authenticate(val.username, val.password)

        if (this.loginService.isAuthenticated())
            this.router.navigate(["/dashboard"])
        else {
            this.error.set(true)
        }

    }
}