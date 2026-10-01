import { Component, signal, inject, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointmentservice } from '../../services/appointmentservice/appointmentservice';
import { NgFor, NgIf } from '@angular/common';
import { Doctorconsultancyservice } from '../../services/doctorconsultancyservice/doctorconsultancyservice';

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
  doctorconsultancyserv = inject(Doctorconsultancyservice);

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

  consultationDetail = {
    patientComplaint: '',
    consultation: '',
    advice: ''
  };

  

  dosages = [
    '1/2 Tablet',
    '1 Tablet',
    '2 Tablets',
    '5 ml',
    '10 ml',
    '1 Capsule',
    '2 Capsules'
  ];

  prescriptions: any[] = [];

  medicineForm: any = this.createEmptyMedicine();
  
  medicines: WritableSignal<any[]> = signal([]);
  
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

  showMedicinePopup = false;
  editingMedicineIndex = -1;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.getAppointmentDetail(id);
    }

    this.getMedicineList();
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

  

  getMedicineList() {
    debugger;
    this.doctorconsultancyserv.getMedicineList().subscribe({
      next: (res: any) => {
        debugger;
        this.medicines.set(res.data)
      }
    })
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
    this.editingMedicineIndex = index;

    const selectedPrescriptionData = this.prescriptions[index];
    
    this.medicineForm = {
      medicineId: selectedPrescriptionData.medicineId,
      medicineName: selectedPrescriptionData.medicineName,
      dosage: selectedPrescriptionData.dosage,
      morning: selectedPrescriptionData.morning,
      afternoon: selectedPrescriptionData.afternoon,
      night: selectedPrescriptionData.night,
      morningBeforeAfter: selectedPrescriptionData.morningBeforeAfter,
      afternoonBeforeAfter: selectedPrescriptionData.afternoonBeforeAfter,
      nightBeforeAfter: selectedPrescriptionData.nightBeforeAfter,
      remark: selectedPrescriptionData.remark
    };

    this.showMedicinePopup = true;
  }

  deleteMedicine(index: number) {
    this.prescriptions.splice(index, 1);
    this.prescriptions = [...this.prescriptions];
  }

  saveMedicine() {
    //Checking Mandatory Fields
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

    //Getting Medicine Detail from medicines variable
    const selectedMedicine = this.medicines().find(
      x => String(x.id) === String(this.medicineForm.medicineId)
    );

    //Setting medicineName of medicineForm array variable from selectedMedicine Constant Variable
    //this.medicineForm.medicineName = selectedMedicine?.name || '';
    this.medicineForm.medicineName = selectedMedicine?.name;

    const prescription = {
      ...this.medicineForm,
      frequency: this.buildFrequency(),
      beforeAfter: this.buildBeforeAfter()
    };

    /*if (this.editingMedicineIndex >= 0) {
      this.prescriptions[this.editingMedicineIndex] = prescription;
      this.prescriptions = [...this.prescriptions];
    } else {
      this.prescriptions = [...this.prescriptions, prescription];
    }*/
    debugger;
      if (this.editingMedicineIndex >= 0){
          //update medicineForm variable data in prescriptions array list against editingMedicineIndex  

          //this.prescriptions[this.editingMedicineIndex] = this.medicineForm;
          this.prescriptions[this.editingMedicineIndex] = prescription;
      }else{
        //Insert medicineForm variable data in prescriptions array list  
        //this.prescriptions.push(this.medicineForm);
        this.prescriptions.push(prescription);
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
    if (!this.consultationDetail.patientComplaint.trim()) {
      alert('Patient Complaint is mandatory.');
      return;
    }

    if (!this.consultationDetail.consultation.trim()) {
      alert('Consultation is mandatory.');
      return;
    }

    const consultationData = {
      appointmentId: this.appointmentsfordoctor().AppointmentId,
      patientId: this.appointmentsfordoctor().PatientId,
      patientComplaint: this.consultationDetail.patientComplaint,
      consultation: this.consultationDetail.consultation,
      advice: this.consultationDetail.advice,
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

  tests = [
    { id: 1, name: 'bloodtest' },
    { id: 2, name: 'urinetest' }
  ];

  testlist: any[] = [];

 testForm: any = this.createEmptytest();
  
  createEmptytest() {
    return {
      testId: '',
      testName: ''
    };
  }

  showTestPopup = false;
  editingTestIndex = -1;

  addTestPopup() {
    this.editingTestIndex = -1;
    this.testForm = this.createEmptytest();
    this.showTestPopup = true;
  }

  closeTestPopup() {
    this.showTestPopup = false;
    this.editingTestIndex = -1;
    this.testForm = this.createEmptytest();
  }

  editTest(index: number) {
    this.editingTestIndex = index;

    const selectedtestData = this.testlist[index];
    
    this.testForm = {
      testId: selectedtestData.testId,
      testName: selectedtestData.testName
    };

    this.showTestPopup = true;
  }

  deleteTest(index: number) {
    this.testlist.splice(index, 1);
    this.testlist = [...this.testlist];
  }


  saveTest() {
    //Checking Mandatory Fields
    if (!this.testForm.testId) {
      alert('Please select Test.');
      return;
    }

    //Getting Test Detail from testlist variable
    const selectedTest = this.tests.find(
      x => String(x.id) === String(this.testForm.testId)
    );

    this.testForm.testName = selectedTest?.name;
    
    if (this.editingTestIndex >= 0){
        this.testlist[this.editingTestIndex] = this.testForm;
    }
    else{
      this.testlist.push(this.testForm);
    }

    this.closeTestPopup();
  }

}

