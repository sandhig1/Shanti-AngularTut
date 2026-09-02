import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Areaservice } from '../../services/areaservice/areaservice';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-area',
  imports: [FormsModule],
  templateUrl: './area.html',
  styleUrl: './area.css',
})
export class Area {

  router = inject(Router);
  route = inject(ActivatedRoute);
  areaserv = inject(Areaservice);

  areaData:WritableSignal<any> = signal({
    AreaId : 0,
    AreaCode:"",
    AreaName:"",
    CityId: 0,
    StateId: 0
  })

  cities: WritableSignal<any[]> = signal([]);
  filteredCities : WritableSignal<any[]> = signal([]);
  states: WritableSignal<any[]> = signal([]);  

  constructor() {
    this.getAllState();
    this.getAllCity();

    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getAreaDetail(id);
    }   
    
  }


  arealist(){
     this.router.navigate(['arealist']);
  }

  getAreaDetail(id:number){
    debugger;
     this.areaserv.getAreaDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.areaData.set(res.data)    
        
        this.onStateChange();
      }
    })
  }

  getAllState() {
    debugger;
    this.areaserv.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }


 getAllCity() {
    debugger;
    this.areaserv.getCities().subscribe({
      next: (res: any) => {
        debugger;
        this.cities.set(res.data)
      }
    })
  }

  SaveArea(formRef:NgForm){
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

      if (this.areaData().AreaId<=0){
        this.areaserv.saveArea(this.areaData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Area Saved Successfully")

              this.getAreaDetail(0);
            }
            else{
              alert("Error while saving Area : " + res.msg);
              console.log("Error while Saving Area : " + res.msg);
            }
          }
        })
      }
      else{
        this.areaserv.updateArea(this.areaData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Area Updated Successfully")
             
            }
            else{
              alert("Error while updating Area");
              console.log("Error while updating Area : " + res.msg);
            }
          }
        })
      }
    }
  }

  onStateChange() {
    debugger;
    const result = this.cities().filter(x => x.StateId.toString() == this.areaData().StateId);

    // Set filtered cities
    this.filteredCities.set(result);
  }


}
