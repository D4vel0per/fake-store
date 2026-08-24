import { Component, inject, output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/AuthService";
import { Router } from "@angular/router";

@Component({
    selector: "signin",
    template: `
    <div class="top-container">
        <h3>Sign in</h3>
    </div>
    <form [formGroup]="formGroup" (ngSubmit)="handleSubmit()">
        <label for="username" class="column left">
            Username
            <input id="username" type="text" formControlName="username" placeholder="Enter your username" />
        </label>
        <label for="password" class="column left">
            Password
            <input id="password" type="password" formControlName="password" placeholder="Enter your password" />
        </label>
        <label for="confirmPassword" class="column left">
            Confirm password
            <input id="confirmPassword" type="password" formControlName="confirmPassword" placeholder="Confirm your password" />
        </label>
        <button type="submit">Submit</button>
        @if (submitted() && formGroup.controls.username.invalid) {
            <span class="error-message">Please enter a valid username.</span>
        }
        @if (submitted() && formGroup.controls.password.invalid) {
            <span class="error-message">Please enter a valid password.</span>
        }
        @if (submitted() && formGroup.controls.confirmPassword.invalid) {
            <span class="error-message">Please confirm your password.</span>
        }
        @if (submitted() && formGroup.controls.password.valid && formGroup.controls.confirmPassword.valid && formGroup.controls.password.value !== formGroup.controls.confirmPassword.value) {
            <span class="error-message">Passwords do not match.</span>
        }
    </form>
    <div class="bottom-container">
        <span>Already have an account? <span (click)="handleToggle()">Log in!</span></span>
    </div>
    `,
    styleUrl: "./styles.css",
    imports: [ReactiveFormsModule]
})
export class SigninComponent {
    signInService = inject(AuthService)
    router = inject(Router)
    submitted = signal(false)
    toggle = output();
    formGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\.\-]+$/i)]),
        password: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\.\-]+$/i)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\.\-]+$/i)])
    });

    handleToggle() {
        this.toggle.emit();
    }

    async handleSubmit() {
        this.submitted.set(true)

        const { username, password, confirmPassword } = this.formGroup.value
        if (!username || !password || !confirmPassword) return;
        if (this.formGroup.invalid || password !== confirmPassword) return;

        await this.signInService.signIn(username, password)

        if (this.signInService.isAuthenticated())
            this.router.navigate(["/dashboard"])
    }
}
