import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinicservice } from '../../services/clinicservice/clinicservice';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-clinic',
  imports: [FormsModule],
  templateUrl: './clinic.html',
  styleUrl: './clinic.css',
})
export class Clinic {

  router = inject(Router);
  route = inject(ActivatedRoute);
  clinicServ = inject(Clinicservice);

  clinicData: WritableSignal<any> = signal({
    ClinicId: 0,
    ClinicCode: "",
    ClinicName: "",
    StateId: "",
    StateName: "",
    CityId: "",
    CityName: ""
  });

  cities: WritableSignal<any[]> = signal([]);
  filteredCities: WritableSignal<any[]> = signal([]);
  states: WritableSignal<any[]> = signal([]);

  constructor() {
    this.getAllState();
    this.getAllCity();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.getClinicDetail(id);
    }
  }


  cliniclist() {
    this.router.navigate(['cliniclist']);
  }

  getClinicDetail(id: number) {
    debugger;

    this.clinicServ.getClinicDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.clinicData.set(res.data)

        this.getFilteredCities();
      }
    })
  }

  getAllState() {
    debugger;
    this.clinicServ.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }


  getAllCity() {
    debugger;
    this.clinicServ.getCities().subscribe({
      next: (res: any) => {
        debugger;
        this.cities.set(res.data)
      }
    })
  }

  saveClinic(formRef: NgForm) {
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
      alert("Clinic data is not valid. Please check fields marked with *");
    }
    else{

      if (this.clinicData().ClinicId <= 0) {
        this.clinicServ.saveClinic(this.clinicData()).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              alert("Clinic Saved Successfully")

              this.getClinicDetail(0);
            }
            else {
              alert("Error while saving Clinic");
              console.log("Error while saving Clinic : " + res.msg);
            }
          }
        })
      }
      else {
        this.clinicServ.updateClinic(this.clinicData()).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              alert("Clinic Updated Successfully")

            }
            else {
              alert("Error while updating Clinic");
              console.log("Error while updating Clinic : " + res.msg);
            }
          }
        })
      }
    }
  }

  getFilteredCities(){
    const result = this.cities().filter(x => x.StateId.toString() == this.clinicData().StateId);

    // Set filtered cities
    this.filteredCities.set(result);
  }

  onStateChange() {
    debugger;
     this.getFilteredCities();

     this.clinicData().CityId = "";
  }

}
