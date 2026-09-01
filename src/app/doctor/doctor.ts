import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctorservice } from '../../services/doctorservice/doctorservice';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  imports: [FormsModule],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class Doctor {

  router = inject(Router);
  route = inject(ActivatedRoute);
  doctorserv = inject(Doctorservice);

  doctorData:WritableSignal<any> = signal({
    DoctorId : 0,
    DoctorCode:"",
    DoctorName:"",
    Gender:"",
    Age: 0,
    Qualification:"",
    Address:"",
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
      this.getDoctorDetail(id);
    }   
    
  }


  doctorlist(){
     this.router.navigate(['doctorlist']);
  }

  getDoctorDetail(id:number){
    debugger;
     this.doctorserv.getDoctorDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.doctorData.set(res.data)    
        
        this.onStateChange();
      }
    })
  }

  getAllState() {
    debugger;
    this.doctorserv.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }


 getAllCity() {
    debugger;
    this.doctorserv.getCities().subscribe({
      next: (res: any) => {
        debugger;
        this.cities.set(res.data)
      }
    })
  }

  SaveDoctor(formRef:NgForm){
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
    if (formRef.valid){

      if (this.doctorData().DoctorId<=0){
        this.doctorserv.saveDoctor(this.doctorData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Doctor Saved Successfully")

              this.getDoctorDetail(0);
            }
            else{
              alert("Error while saving Doctor : " + res.msg);
            }
          }
        })
      }
      else{
        this.doctorserv.updateDoctor(this.doctorData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Doctor Updated Successfully")
             
            }
            else{
              alert("Error while updating Doctor");
            }
          }
        })
      }
    }
  }

  onStateChange() {
    debugger;
    const result = this.cities().filter(x => x.StateId.toString() == this.doctorData().StateId);

    // Set filtered cities
    this.filteredCities.set(result);
  }

}
