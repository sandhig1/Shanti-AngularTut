import { Component, signal, inject, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointmentservice } from '../../services/appointmentservice/appointmentservice';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Doctorconsultancyservice } from '../../services/doctorconsultancyservice/doctorconsultancyservice';
import { concat } from 'rxjs';

@Component({
  selector: 'app-doctorConsultancy',
  imports: [FormsModule, NgIf, NgFor, JsonPipe],
  templateUrl: './doctorConsultancy.html',
  styleUrl: './doctorConsultancy.css',
})
export class DoctorConsultancy {

  router = inject(Router);
  route = inject(ActivatedRoute);
  appointmentserv = inject(Appointmentservice);
  doctorconsultancyserv = inject(Doctorconsultancyservice);

  DoctorConsultancy: WritableSignal<any> = signal({
    ConsultancyId: 0,
    AppointmentId: "",
    DoctorId: "",
    PatientComplaint: "",
    Consultation: "",
    Advice: "",
    CreatedOn: "",
    CreatedBy: "",
    Prescriptions: [],
    Tests: []
  });

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


  prescriptions: any[] = [];

  medicineForm: any = this.createEmptyMedicine();


  testlist: any[] = [];

  testForm: any = this.createEmptytest();

  medicines: WritableSignal<any[]> = signal([]);

  dosages: WritableSignal<any[]> = signal([]);
  
  tests: WritableSignal<any[]> = signal([]);

  createEmptyMedicine() {
    return {
      medicineId: '',
      medicineName: '',
      dosageId: '',
      dosage: '',
      morning: '',
      afternoon: '',
      night: '',
      morningBeforeAfter: '',
      afternoonBeforeAfter: '',
      nightBeforeAfter: '',
      remark: ''
    };
  };

  createEmptytest() {
    return {
      testId: '',
      testName: ''
    };
  };



  showMedicinePopup = false;
  editingMedicineIndex = -1;

  showTestPopup = false;
  editingTestIndex = -1;

  refId: number = 0;
  mode: string = 'A';

  constructor() {
    concat(
      this.getMedicineList(),
      this.getDosageList(),
      this.getTestList(),
    ).subscribe({
      next: res => {
        console.log('API completed:', res);
        this.refId = Number(this.route.snapshot.paramMap.get('id'));
        this.mode = String(this.route.snapshot.paramMap.get('mode'));

        if (this.mode === 'A' || this.mode === '' || this.mode === null) {
          this.getAppointmentDetail(this.refId);
        }
        else {
          this.getDoctorConsultancyDetail(this.refId);
        }
      },
      complete: () => {
        console.log('All APIs completed');
      }
    });
  };

  Doctorconsultancylist() {
    this.router.navigate(['doctorconsultancylist']);
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
  };

  getDoctorConsultancyDetail(id: number) {
    debugger;
    this.doctorconsultancyserv.getDoctorConsultancyDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.DoctorConsultancy.set(res.data)  //Setting data in DoctorConsultancy signal variable

        this.appointmentsfordoctor.set(res.data); //Seting data in appointmentsfordoctor signal variable
        this.appointmentsfordoctor().StatusName = res.data.AppointmentStatus;

        this.prescriptions = [];
        this.testlist = [];

        for (const prescription of this.DoctorConsultancy().Prescriptions) {
          this.medicineForm.morning = prescription.Morning;
          this.medicineForm.afternoon = prescription.Afternoon;
          this.medicineForm.night = prescription.Night;

          this.medicineForm.morningBeforeAfter = prescription.MorningBeforeAfter;
          this.medicineForm.afternoonBeforeAfter = prescription.AfternoonBeforeAfter;
          this.medicineForm.nightBeforeAfter = prescription.NightBeforeAfter;
      
          var prescriptionData = {
            medicineId: prescription.MedicineId,
            medicineName: prescription.MedicineName,
            dosageId: prescription.DosageId,
            dosage: prescription.Dosage,
            morning: prescription.Morning,
            afternoon: prescription.Afternoon,
            night: prescription.Night,
            morningBeforeAfter: prescription.MorningBeforeAfter,
            afternoonBeforeAfter: prescription.AfternoonBeforeAfter,
            nightBeforeAfter: prescription.NightBeforeAfter,
            
            frequency: this.buildFrequency(),
            beforeAfter: this.buildBeforeAfter(),
            
            remark: prescription.Remark
          }
          this.prescriptions.push(prescriptionData);
        };

        for (const test of this.DoctorConsultancy().Tests) {
          var testData = {
            testId: test.TestId,
            testName: test.TestName,
          }
          this.testlist.push(testData);
        }

        
      }
    })
  };

  async getMedicineList(): Promise<void> {
    debugger;
    this.doctorconsultancyserv.getMedicineList().subscribe({
      next: (res: any) => {
        debugger;
        this.medicines.set(res.data)
      }
    })
  };

  async getDosageList(): Promise<void> {
    debugger;
    this.doctorconsultancyserv.getDosageList().subscribe({
      next: (res: any) => {
        debugger;
        this.dosages.set(res.data)
      }
    })
  };

  async getTestList(): Promise<void> {
    debugger;
    this.doctorconsultancyserv.getTestList().subscribe({
      next: (res: any) => {
        debugger;
        this.tests.set(res.data)
      }
    })
  };

  SaveDoctorConsultancy(formRef: NgForm) {
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
      alert("Doctor Consultancy data is not valid. Please check fields marked with *");
    }
    else {

      this.DoctorConsultancy().AppointmentId = this.refId;
      this.DoctorConsultancy().DoctorId = this.appointmentsfordoctor().DoctorId;
      this.DoctorConsultancy().CreatedBy = 1;//localStorage.getItem("UserId");
      this.DoctorConsultancy().Prescriptions = this.prescriptions;
      this.DoctorConsultancy().Tests = this.testlist;

      if (this.DoctorConsultancy().ConsultancyId <= 0) {
        this.doctorconsultancyserv.saveDoctorConsultancy(this.DoctorConsultancy()).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              alert("Doctor Consultancy Saved Successfully")

              //this.getDoctorConsultancyDetail(0);
              this.router.navigate(['/doctorconsultancylist/']);
            }
            else {
              alert("Error while saving DoctorConsultancy");
              console.log("Error while saving Doctor Consultancy : " + res.msg);
            }
          }
        })
      }
      else {
        this.doctorconsultancyserv.updateDoctorConsultancy(this.DoctorConsultancy()).subscribe({
          next: (res: any) => {
            if (res.status == true) {
              alert("Doctor Consultancy Updated Successfully")
              this.router.navigate(['/doctorconsultancylist/']);
            }
            else {
              alert("Error while updating DoctorConsultancy");
              console.log("Error while updating Doctor Consultancy : " + res.msg);
            }
          }
        })
      }
    }
  };

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
      dosageId: selectedPrescriptionData.dosageId,
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
  };


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
  };

  saveMedicine() {
    //Checking Mandatory Fields
    if (!this.medicineForm.medicineId) {
      alert('Please select Medicine.');
      return;
    }

    if (!this.medicineForm.dosageId) {
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
      x => String(x.MedicineId) === String(this.medicineForm.medicineId)
    );

    //Setting medicineName of medicineForm array variable from selectedMedicine Constant Variable
    //this.medicineForm.medicineName = selectedMedicine?.name || '';
    this.medicineForm.medicineName = selectedMedicine?.MedicineName;

    //Getting Dosage Detail from dosages variable
    const selectedDosage = this.dosages().find(
      x => String(x.DosageId) === String(this.medicineForm.dosageId)
    );

    //Setting dosageName of medicineForm array variable from selectedDosage Constant Variable
    this.medicineForm.dosage = selectedDosage?.Dosage;

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
    if (this.editingMedicineIndex >= 0) {
      //update medicineForm variable data in prescriptions array list against editingMedicineIndex  

      //this.prescriptions[this.editingMedicineIndex] = this.medicineForm;
      this.prescriptions[this.editingMedicineIndex] = prescription;
    } else {
      //Insert medicineForm variable data in prescriptions array list  
      //this.prescriptions.push(this.medicineForm);
      this.prescriptions.push(prescription);
    }

    this.closeMedicinePopup();
  };

  saveTest() {
    //Checking Mandatory Fields
    if (!this.testForm.testId) {
      alert('Please select Test.');
      return;
    }

    //Getting Test Detail from tests variable
    const selectedTest = this.tests().find(
      x => String(x.TestId) === String(this.testForm.testId)
    );

    this.testForm.testName = selectedTest?.TestName;

    if (this.editingTestIndex >= 0) {
      this.testlist[this.editingTestIndex] = this.testForm;
    }
    else {
      this.testlist.push(this.testForm);
    }

    this.closeTestPopup();
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

  goBack() {
    this.router.navigate(['/appointmentsfordoctor/']);
  }

  print() {
    window.print();
  };

}

