import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../state/state';
import { JsonPipe, NgIf } from '@angular/common';
import { Cityservice } from '../../services/cityservice/cityservice';
import { Stateservice } from '../../services/stateservice/stateservice';


@Component({
  selector: 'app-city',
  imports: [FormsModule],
  templateUrl: './city.html',
  styleUrl: './city.css',
})
export class City {

  router = inject(Router);
  route = inject(ActivatedRoute);

  cityserv = inject(Cityservice);
  stateserv = inject(Stateservice);

  cityData:WritableSignal<any> = signal({
      CityId :0,
      CityCode:"",
      CityName:"",
      StateId :0
    });

  states: WritableSignal<any[]> = signal([]);
  
  
  CityId = '';
  CityCode = '';
  CityName = '';
  StateId="0";

  
  constructor() {

    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getCityDetail(id);
    }

    this.getAllState();
  }

  citylist(){
     this.router.navigate(['citylist']);
  }  
  
  getCityDetail(id:number){
    debugger;

     this.cityserv.getCityDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.cityData.set(res.data)
      }
    })
  }
 
  getAllState() {
    debugger;
    this.stateserv.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }

  SaveCity(formRef:NgForm){
    debugger;
console.log('FORM VALID:', formRef.valid);
  console.log('FORM INVALID:', formRef.invalid);

  Object.keys(formRef.controls).forEach(key => {
    const control = formRef.controls[key];

    console.log(
      key,
      'value =', control.value,
      'valid =', control.valid,
      'invalid =', control.invalid,
      'errors =', control.errors,
      'pending =', control.pending
    );
  });
    if (formRef.invalid){
      alert("Error while saving Doctor.");
    }
    else{

      if (this.cityData().CityId<=0){
        this.cityserv.saveCity(this.cityData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("City Saved Successfully")

              this.getCityDetail(0);
            }
            else{
              alert("Error while saving City");
              console.log("Error while saving City : " + res.msg);
            }
          }
        })
      }
      else{
        this.cityserv.updateCity(this.cityData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("City Updated Successfully")
             
            }
            else{
              alert("Error while updating City");
              console.log("Error while updating City : " + res.msg);
            }
          }
        })
      }
    }
  }
  
}
