import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointmentservice } from '../../services/appointmentservice/appointmentservice';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  imports: [FormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {

  router = inject(Router);
  route = inject(ActivatedRoute);
  appointmentserv = inject(Appointmentservice);

  appointmentData:WritableSignal<any> = signal({
    AppointmentId : 0,
    AppointmentNo:"",
    AppointmentDate:"",
    AppointmentTime:"",
    AppointmentTimeFormatted:"",
    ClinicId: "",
    PatientId: "",
    DoctorId: "",
    Reason: ""
    
})


Clinic: WritableSignal<any[]> = signal([]);  
Patient: WritableSignal<any[]> = signal([]);  
Doctor: WritableSignal<any[]> = signal([]);
Status: WritableSignal<any[]> = signal([]); 

constructor() {
    this.getAllClinic();
    this.getAllPatient();
    this.getAllDoctor();


    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getAppointmentDetail(id);
    }   
    
  }

appointmentlist(){
     this.router.navigate(['appointmentlist']);
  }

  getAppointmentDetail(id:number){
    debugger;
     this.appointmentserv.getAppointmentDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.appointmentData.set(res.data)    
        
        this.appointmentData().AppointmentDate = this.appointmentData().AppointmentDate?.split('T')[0];

      }
    })
  }

  SaveAppointment(formRef:NgForm){
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
      alert("Appointment data is not valid. Please check fields marked with *");
    }
    else{

      if (this.appointmentData().AppointmentId<=0){
        this.appointmentserv.saveAppointment(this.appointmentData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Appointment Saved Successfully")

              this.getAppointmentDetail(0);
            }
            else{
              alert("Error while saving Appointment");
              console.log("Error while saving Appointment : " + res.msg);
            }
          }
        })
      }
      else{
        this.appointmentserv.updateAppointment(this.appointmentData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Appointment Updated Successfully")              
            }
            else{
              alert("Error while updating Appointment");
              console.log("Error while updating Appointment : " + res.msg);
            }
          }
        })
      }
    }
  }

  getAllClinic() {
    debugger;
    this.appointmentserv.getClinic().subscribe({
      next: (res: any) => {
        debugger;
        this.Clinic.set(res.data)
      }
    })
  }

  getAllPatient() {
    debugger;
    this.appointmentserv.getPatient().subscribe({
      next: (res: any) => {
        debugger;
        this.Patient.set(res.data)
      }
    })
  }

  getAllDoctor() {
    debugger;
    this.appointmentserv.getDoctor().subscribe({
      next: (res: any) => {
        debugger;
        this.Doctor.set(res.data)
      }
    })
  }

  


}
