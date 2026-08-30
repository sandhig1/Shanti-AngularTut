import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Areaservice } from '../../services/areaservice/areaservice';

@Component({
  selector: 'app-arealist',
  imports: [],
  templateUrl: './arealist.html',
  styleUrl: './arealist.css',
})
export class Arealist {

  router = inject(Router);
  areaServ = inject(Areaservice);
  cityServ = inject(Areaservice);
  stateServ = inject(Areaservice);


  areas: WritableSignal<any[]> = signal([]);
  //cities: WritableSignal<any[]> = signal([]);


  constructor() {
    this.getAllArea();
  }

  AddArea() {
    this.router.navigate(['area']);
  }

  getAllArea() {
    debugger;
    this.areaServ.getAreas().subscribe({
      next: (res: any) => {
        debugger;
        this.areas.set(res.data)
      }
    })
  }

  //Edit Area//
  editArea(id: number) {
    debugger;
    this.router.navigate(['area/' + id]);
  };

  deleteArea(id: number) {
    debugger;
    if (id > 0) {
      this.areaServ.deleteArea(id).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status == true) {
            alert("Area Deleted Successfully")
            this.getAllArea();
          }
          else {
            alert("Error while Deleting Area");
          }
        }
      })
    }
  }

 }
