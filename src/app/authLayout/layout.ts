import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'auth-layout',
    templateUrl: "./layout.html",
    styleUrls: ["./styles.css"],
    imports: [RouterOutlet]
})
export class AuthLayout {}