import { Component, inject,  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 
   router = inject(Router);

  enquiry(){
    this.router.navigate(['enquiry']);
  }
  
    city(){
    this.router.navigate(['city']);
  }
    
   arealist(){
    this.router.navigate(['arealist']);
  }
   state(){
    this.router.navigate(['state']);
  }

  cliniclist(){
    this.router.navigate(['cliniclist']);
  }

  doctorlist(){
    this.router.navigate(['doctorlist']);
  }

  dashboard(){
    this.router.navigate(['dashboard']);
  }

  binding(){
    this.router.navigate(['binding']);
  }

  directive(){
    this.router.navigate(['directive']);
  }

  controlflow(){
    this.router.navigate(['controlflow']);
  }

  signOut(){
    this.router.navigate(['login']);
  }

}
