import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from "@angular/forms";
import { LoginComponent } from "./login";
import { SigninComponent } from "./signin";

@Component({
    selector: 'auth-page',
    template: `
    <div class="rounded-container column">
        @if (hasAccount) {
            <login (toggle)="toggleAccount()" />
        } @else {
            <signin (toggle)="toggleAccount()" />
        }
    </div>
    `,
    styleUrl: "./styles.css",
    imports: [ ReactiveFormsModule, LoginComponent, SigninComponent ]
})
export class AuthPage {
    hasAccount = true
    authForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z\-\.]/)])
    })
    toggleAccount () {
        this.hasAccount = !this.hasAccount
    }
}