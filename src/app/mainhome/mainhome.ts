import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainhome',
  imports: [],
  templateUrl: './mainhome.html',
  styleUrl: './mainhome.css',
})
export class Mainhome {
  protected readonly title = signal('Angular-Tut');

  router = inject(Router);

  loginNow(){
    this.router.navigate(['login']);
  };
  signUp(){
    this.router.navigate(['signup']);
  }
}
