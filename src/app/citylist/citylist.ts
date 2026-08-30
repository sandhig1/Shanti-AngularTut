import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Cityservice } from '../../services/cityservice/cityservice';

@Component({
  selector: 'app-citylist',
  imports: [],
  templateUrl: './citylist.html',
  styleUrl: './citylist.css',
})
export class Citylist {

  router = inject(Router);
  cityServ = inject(Cityservice)

  cities: WritableSignal<any[]> = signal([]);

  constructor() {
    this.getAllCity();
  }

  AddCity() {
    this.router.navigate(['city']);
  }

  getAllCity() {
    debugger;
    this.cityServ.getCities().subscribe({
      next: (res: any) => {
        debugger;
        this.cities.set(res.data)
      }
    })
  }

  //Edit City//
  city(id: number) {
    debugger;
    this.router.navigate(['city/' + id]);
  };

  deleteCity(id: number) {
    debugger;
    if (id > 0) {
      this.cityServ.deleteCity(id).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status == true) {
            alert("City Deleted Successfully")
            this.getAllCity();
          }
          else {
            alert("Error while Deleting City");
          }
        }
      })
    }
  }
  
}
