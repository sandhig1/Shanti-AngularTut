import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointmentservice } from '../../services/appointmentservice/appointmentservice';
import { FormsModule, NgForm } from '@angular/forms';
import { concat, firstValueFrom } from 'rxjs';

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

  appointmentData: WritableSignal<any> = signal({
    AppointmentId: 0,
    AppointmentNo: "",
    AppointmentDate: "",
    AppointmentTime: "",
    AppointmentTimeFormatted: "",
    ClinicId: "",
    PatientId: "",
    DoctorId: "",
    Reason: ""

  })


  Clinic: WritableSignal<any[]> = signal([]);
  Patient: WritableSignal<any[]> = signal([]);
  Doctor: WritableSignal<any[]> = signal([]);
  filteredDoctors: WritableSignal<any[]> = signal([]);
  filteredPatients: WritableSignal<any[]> = signal([]);
  Status: WritableSignal<any[]> = signal([]);

  constructor() {
    concat(
      this.getAllClinic(),
      this.getAllPatient(),
      this.getAllDoctor(),
    ).subscribe({
      next: res => {
        console.log('API completed:', res);
        const id = Number(this.route.snapshot.paramMap.get('id'));

        if (id > 0) {
          this.getAppointmentDetail(id);
        }
      },
      complete: () => {
        console.log('All APIs completed');
      }
    });
  }

  appointmentlist() {
    this.router.navigate(['appointmentlist']);
  }

  getAppointmentDetail(id: number) {
    debugger;
    this.appointmentserv.getAppointmentDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.appointmentData.set(res.data)

        this.appointmentData().AppointmentDate = this.appointmentData().AppointmentDate?.split('T')[0];

        this.appointmentData().ClinicId = this.appointmentData().ClinicId == 0 ? "" : this.appointmentData().ClinicId;
        this.appointmentData().DoctorId = this.appointmentData().DoctorId == 0 ? "" : this.appointmentData().DoctorId;
        this.appointmentData().PatientId = this.appointmentData().PatientId == 0 ? "" : this.appointmentData().PatientId;

        this.getFilteredPatients();
        this.getFilteredDoctors();
      }
    })
  }

  SaveAppointment(formRef: NgForm) {
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
    if (formRef.invalid) {
      alert("Appointment data is not valid. Please check fields marked with *");
    }
    else {

      if (this.appointmentData().AppointmentId <= 0) {
        this.appointmentserv.saveAppointment(this.appointmentData()).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              alert("Appointment Saved Successfully")

              this.getAppointmentDetail(0);
            }
            else {
              alert("Error while saving Appointment");
              console.log("Error while saving Appointment : " + res.msg);
            }
          }
        })
      }
      else {
        this.appointmentserv.updateAppointment(this.appointmentData()).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              alert("Appointment Updated Successfully")
            }
            else {
              alert("Error while updating Appointment");
              console.log("Error while updating Appointment : " + res.msg);
            }
          }
        })
      }
    }
  }

  async getAllClinic(): Promise<void> {
    debugger;
    this.appointmentserv.getClinic().subscribe({
      next: (res: any) => {
        debugger;
        this.Clinic.set(res.data)
      }
    })
  }

  async getAllPatient(): Promise<void> {
    debugger;
    this.appointmentserv.getPatient().subscribe({
      next: (res: any) => {
        debugger;
        this.Patient.set(res.data)
      }
    })
  }

  async getAllDoctor(): Promise<void> {
    debugger;
    this.appointmentserv.getDoctor().subscribe({
      next: (res: any) => {
        debugger;
        this.Doctor.set(res.data)
      }
    })
  }


  getFilteredDoctors() {
    const result = this.Doctor().filter(x => x.ClinicId.toString() == this.appointmentData().ClinicId);

    this.filteredDoctors.set(result);
  }


  getFilteredPatients() {
    const result = this.Patient().filter(x => x.ClinicId.toString() == this.appointmentData().ClinicId);

    this.filteredPatients.set(result);
  }

  onClinicChange() {
    debugger;
    this.getFilteredPatients();
    this.getFilteredDoctors();

    this.appointmentData().PatientId = "";
    this.appointmentData().DoctorId = "";
  }

}
