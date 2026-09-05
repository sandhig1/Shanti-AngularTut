import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patientservice } from '../../services/patientservice/patientservice';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient',
  imports: [FormsModule, DatePipe],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {

  router = inject(Router);
  route = inject(ActivatedRoute);
  patientserv = inject(Patientservice);

  patientData:WritableSignal<any> = signal({
    PatientId : 0,
    PatientCode:"",
    PatientName:"",
    DateOfBirth:"",
    Gender:"",
    Age: 0,
    MobileNo:"",
    EmailAdd:"",
    Address:"",
    AreaId: 0,
    CityId: 0,
    StateId: 0
  })
  areas: WritableSignal<any[]> = signal([]);
  cities: WritableSignal<any[]> = signal([]);
  filteredCities : WritableSignal<any[]> = signal([]);
  filteredAreas : WritableSignal<any[]> = signal([]);
  states: WritableSignal<any[]> = signal([]);  

  constructor() {
    this.getAllState();
    this.getAllCity();
    this.getAllArea();

    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getPatientDetail(id);
    }   
    
  }


  patientlist(){
     this.router.navigate(['patientlist']);
  }

  getPatientDetail(id:number){
    debugger;
     this.patientserv.getPatientDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.patientData.set(res.data)    
        
        this.patientData().DateOfBirth = this.patientData().DateOfBirth?.split('T')[0];

        this.patientData().AreaId = this.patientData().AreaId==0? "": this.patientData().AreaId;

        this.getFilteredCities();
        this.getFilteredAreas();

      }
    })
  }

  getAllState() {
    debugger;
    this.patientserv.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }


 getAllCity() {
    debugger;
    this.patientserv.getCities().subscribe({
      next: (res: any) => {
        debugger;
        this.cities.set(res.data)
      }
    })
  }

  getAllArea() {
    debugger;
    this.patientserv.getAreas().subscribe({
      next: (res: any) => {
        debugger;
        this.areas.set(res.data)
      }
    })
  }

  SavePatient(formRef:NgForm){
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
      alert("Patient data is not valid. Please check fields marked with *");
    }
    else{

      if (this.patientData().PatientId<=0){
        this.patientserv.savePatient(this.patientData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Patient Saved Successfully")

              this.getPatientDetail(0);
            }
            else{
              alert("Error while saving Patient");
              console.log("Error while saving Patient : " + res.msg);
            }
          }
        })
      }
      else{
        this.patientserv.updatePatient(this.patientData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Patient Updated Successfully")              
            }
            else{
              alert("Error while updating Patient");
              console.log("Error while updating Patient : " + res.msg);
            }
          }
        })
      }
    }
  }

  getFilteredCities(){
    const result = this.cities().filter(x => x.StateId.toString() == this.patientData().StateId);

    // Set filtered cities
    this.filteredCities.set(result);
  }

  onStateChange() {
    debugger;

    this.getFilteredCities();

    this.patientData().CityId = "";
    this.patientData().AreaId = "";
  }

  getFilteredAreas(){
    const result = this.areas().filter(x => x.CityId.toString() == this.patientData().CityId);

    // Set filtered areas
    this.filteredAreas.set(result);
  }

  onCityChange() {
    debugger;
    this.getFilteredAreas();

    this.patientData().AreaId = "";
  
  }

}
