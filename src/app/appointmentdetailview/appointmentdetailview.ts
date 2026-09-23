import { Component, computed, signal, inject, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appointmentsfordoctorservice } from '../../services/appointmentsfordoctorservice/appointmentsfordoctorservice';
import { Appointmentservice } from '../../services/appointmentservice/appointmentservice';
import { concat } from 'rxjs';

@Component({
  selector: 'app-Appointmentdetailview',
  imports: [FormsModule],
  templateUrl: './appointmentdetailview.html',
  styleUrl: './appointmentdetailview.css',
})
export class Appointmentdetailview {

  router = inject(Router);
  route = inject(ActivatedRoute)
  appointmentsfordoctorserv = inject(appointmentsfordoctorservice);
  appointmentserv = inject(Appointmentservice);

  appointmentId:number=0;

  appointmentsfordoctor: WritableSignal<any> = signal({
    AppointmentId: 0,
    AppointmentNo: "",
    AppointmentDate: "",
    AppointmentTime: "",
    AppointmentDateFormatted: "",
    AppointmentTimeFormatted: "",
    ClinicId: "",
    PatientId: "",
    PatientCode: "",
    PatientName: "",
    Gender: "",
    Age: "",
    MedicalHistory:"",
    DoctorId: "",
    Reason: ""
  });

  constructor() {
      concat(
        this.getAllPatient(),
      ).subscribe({
        next: res => {
          console.log('API completed:', res);
          this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
  
          if (this.appointmentId > 0) {
            this.getAppointmentDetail(this.appointmentId);
          }
        },
        complete: () => {
          console.log('All APIs completed');
        }
      });
    };

  getAppointmentDetail(id: number) {
    debugger;
    this.appointmentserv.getAppointmentDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.appointmentsfordoctor.set(res.data)

        this.appointmentsfordoctor().AppointmentDate = this.appointmentsfordoctor().AppointmentDate?.split('T')[0];

        
        this.appointmentsfordoctor().PatientId = this.appointmentsfordoctor().PatientId == 0 ? "" : this.appointmentsfordoctor().PatientId;

      }
    })
  };

  goBack() {
    debugger;
    this.router.navigate(['/appointmentsfordoctor/']);
  };

  attendNow() {
    debugger;
    this.router.navigate(['/doctorconsultancy/' + this.appointmentId] );
  };

  print() {
    debugger;
    this.router.navigate(['/appointmentsfordoctor/']);
  };

  async getAllPatient(): Promise<void> {
    debugger;
    this.appointmentserv.getPatient().subscribe({
      next: (res: any) => {
        debugger;
      }
    })
  };

}


