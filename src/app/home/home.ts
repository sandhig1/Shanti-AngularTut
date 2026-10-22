import { NgIf } from '@angular/common';
import { Component, inject,  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 
   router = inject(Router);

  showMasters: boolean = false;

  toggleMasters() {
    //alert('toggleMasters called');
    this.showMasters = !this.showMasters;
  }
    
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

  patientlist(){
    this.router.navigate(['patientlist']);
  }

  stafflist(){
    this.router.navigate(['stafflist']);
  }

  appointmentlist(){
    this.router.navigate(['appointmentlist']);
  }

  appointmentsfordoctor(){
    this.router.navigate(['appointmentsfordoctor']);
  }

  doctorconsultancy(){
    this.router.navigate(['doctorconsultancy']);
  }

  doctorconsultancylist(){
    this.router.navigate(['doctorconsultancylist']);
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

  ganeshfestival(){
    this.router.navigate(['ganeshfestival']);
  }

  signOut(){
    this.router.navigate(['login']);
  }

}
