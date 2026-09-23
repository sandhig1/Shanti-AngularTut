import { Component, signal, inject, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointmentservice } from '../../services/appointmentservice/appointmentservice';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-doctorConsultancy',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './doctorConsultancy.html',
  styleUrl: './doctorConsultancy.css',
})
export class DoctorConsultancy {

  router = inject(Router);
  route = inject(ActivatedRoute);
  appointmentserv = inject(Appointmentservice);

  appointmentsfordoctor: WritableSignal<any> = signal({
    AppointmentId: 0,
    AppointmentNo: '',
    AppointmentDate: '',
    AppointmentTime: '',
    AppointmentDateFormatted: '',
    AppointmentTimeFormatted: '',
    ClinicId: '',
    PatientId: '',
    PatientCode: '',
    PatientName: '',
    Gender: '',
    Age: '',
    MedicalHistory: '',
    DoctorId: '',
    Reason: '',
    StatusName: ''
  });

  consultation = {
    patientComplaint: '',
    consultation: '',
    advice: ''
  };

  prescriptions: any[] = [];

  medicines = [
    { id: 1, name: 'Paracetamol' },
    { id: 2, name: 'Amoxicillin' },
    { id: 3, name: 'Azithromycin' },
    { id: 4, name: 'Ibuprofen' },
    { id: 5, name: 'Cetirizine' }
  ];

  dosages = [
    '1/2 Tablet',
    '1 Tablet',
    '2 Tablets',
    '5 ml',
    '10 ml',
    '1 Capsule',
    '2 Capsules'
  ];

  showMedicinePopup = false;
  editingMedicineIndex = -1;

  medicineForm: any = this.createEmptyMedicine();

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.getAppointmentDetail(id);
    }
  }

  createEmptyMedicine() {
    return {
      medicineId: '',
      medicineName: '',
      dosage: '',
      morning: '',
      afternoon: '',
      night: '',
      morningBeforeAfter: '',
      afternoonBeforeAfter: '',
      nightBeforeAfter: '',
      remark: ''
    };
  }

  getAppointmentDetail(id: number) {
    this.appointmentserv.getAppointmentDetail(id).subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.appointmentsfordoctor.set(res.data);

          const appointment = this.appointmentsfordoctor();

          if (appointment.AppointmentDate) {
            appointment.AppointmentDate = appointment.AppointmentDate.split('T')[0];
          }

          appointment.PatientId =
            appointment.PatientId == 0 ? '' : appointment.PatientId;
        }
      },
      error: (err) => {
        console.error('Unable to load appointment details:', err);
      }
    });
  }

  openMedicinePopup() {
    this.editingMedicineIndex = -1;
    this.medicineForm = this.createEmptyMedicine();
    this.showMedicinePopup = true;
  }

  closeMedicinePopup() {
    this.showMedicinePopup = false;
    this.editingMedicineIndex = -1;
    this.medicineForm = this.createEmptyMedicine();
  }

  editMedicine(index: number) {
    const medicine = this.prescriptions[index];

    this.editingMedicineIndex = index;
    this.medicineForm = {
      medicineId: medicine.medicineId,
      medicineName: medicine.medicineName,
      dosage: medicine.dosage,
      morning: medicine.morning,
      afternoon: medicine.afternoon,
      night: medicine.night,
      morningBeforeAfter: medicine.morningBeforeAfter,
      afternoonBeforeAfter: medicine.afternoonBeforeAfter,
      nightBeforeAfter: medicine.nightBeforeAfter,
      remark: medicine.remark
    };

    this.showMedicinePopup = true;
  }

  deleteMedicine(index: number) {
    this.prescriptions.splice(index, 1);
    this.prescriptions = [...this.prescriptions];
  }

  saveMedicine() {
    if (!this.medicineForm.medicineId) {
      alert('Please select Medicine.');
      return;
    }

    if (!this.medicineForm.dosage) {
      alert('Please select Dosage.');
      return;
    }

    if (!this.medicineForm.morning &&
        !this.medicineForm.afternoon &&
        !this.medicineForm.night) {
      alert('Please enter at least one frequency for Morning, Afternoon or Night.');
      return;
    }

    const selectedMedicine = this.medicines.find(
      x => String(x.id) === String(this.medicineForm.medicineId)
    );

    this.medicineForm.medicineName = selectedMedicine?.name || '';

    const prescription = {
      ...this.medicineForm,
      frequency: this.buildFrequency(),
      beforeAfter: this.buildBeforeAfter()
    };

    if (this.editingMedicineIndex >= 0) {
      this.prescriptions[this.editingMedicineIndex] = prescription;
      this.prescriptions = [...this.prescriptions];
    } else {
      this.prescriptions = [...this.prescriptions, prescription];
    }

    this.closeMedicinePopup();
  }

  buildFrequency(): string {
    const values: string[] = [];

    if (this.medicineForm.morning) {
      values.push(`Morning: ${this.medicineForm.morning}`);
    }

    if (this.medicineForm.afternoon) {
      values.push(`Afternoon: ${this.medicineForm.afternoon}`);
    }

    if (this.medicineForm.night) {
      values.push(`Night: ${this.medicineForm.night}`);
    }

    return values.join(' | ');
  }

  buildBeforeAfter(): string {
    const values: string[] = [];

    if (this.medicineForm.morning) {
      values.push(
        `Morning: ${this.medicineForm.morningBeforeAfter || '-'}`
      );
    }

    if (this.medicineForm.afternoon) {
      values.push(
        `Afternoon: ${this.medicineForm.afternoonBeforeAfter || '-'}`
      );
    }

    if (this.medicineForm.night) {
      values.push(
        `Night: ${this.medicineForm.nightBeforeAfter || '-'}`
      );
    }

    return values.join(' | ');
  }

  saveConsultation() {
    if (!this.consultation.patientComplaint.trim()) {
      alert('Patient Complaint is mandatory.');
      return;
    }

    if (!this.consultation.consultation.trim()) {
      alert('Consultation is mandatory.');
      return;
    }

    const consultationData = {
      appointmentId: this.appointmentsfordoctor().AppointmentId,
      patientId: this.appointmentsfordoctor().PatientId,
      patientComplaint: this.consultation.patientComplaint,
      consultation: this.consultation.consultation,
      advice: this.consultation.advice,
      prescriptions: this.prescriptions
    };

    console.log('Consultation data:', consultationData);

    // TODO:
    // Replace the console.log with the API call for saving
    // consultation and prescription data.
    alert('Consultation saved successfully.');
  }

  goBack() {
    this.router.navigate(['/appointmentsfordoctor/']);
  }

  print() {
    window.print();
  }
}

