
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  router = inject(Router);

  home(){
    this.router.navigate(['dashboard']);
  }

   signUp(){
    this.router.navigate(['signup']);
  }
}
