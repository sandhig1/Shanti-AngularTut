import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staffservice } from '../../services/staffservice/staffservice';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff',
  imports: [FormsModule],
  templateUrl: './staff.html',
  styleUrl: './staff.css',
})
export class Staff {

  router = inject(Router);
  route = inject(ActivatedRoute);
  staffserv = inject(Staffservice);

  staffData:WritableSignal<any> = signal({
    StaffId : 0,
    StaffCode:"",
    StaffName:"",
    DateOfBirth:"",
    Gender:"",
    Age: 0,
    MobileNo:"",
    EmailAdd:"",
    Address:"",
    JoiningDate:"",
    StaffCategoryId: "",
    DepartmentId: "",
    Status: ""
})

StaffCategory: WritableSignal<any[]> = signal([]);  
Department: WritableSignal<any[]> = signal([]);  

constructor() {
    this.getAllStaffCategory();
    this.getAllDepartment();


    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getStaffDetail(id);
    }   
    
  }

stafflist(){
     this.router.navigate(['stafflist']);
  }

  getStaffDetail(id:number){
    debugger;
     this.staffserv.getStaffDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.staffData.set(res.data)    
        
        this.staffData().DateOfBirth = this.staffData().DateOfBirth?.split('T')[0];
        this.staffData().JoiningDate = this.staffData().JoiningDate?.split('T')[0];

      }
    })
  }

  SaveStaff(formRef:NgForm){
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
      alert("Staff data is not valid. Please check fields marked with *");
    }
    else{

      if (this.staffData().StaffId<=0){
        this.staffserv.saveStaff(this.staffData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Staff Saved Successfully")

              this.getStaffDetail(0);
            }
            else{
              alert("Error while saving Staff");
              console.log("Error while saving Staff : " + res.msg);
            }
          }
        })
      }
      else{
        this.staffserv.updateStaff(this.staffData()).subscribe({
          next: (res: any) => {
            if (res.status==true){
              alert("Staff Updated Successfully")              
            }
            else{
              alert("Error while updating Staff");
              console.log("Error while updating Staff : " + res.msg);
            }
          }
        })
      }
    }
  }

  getAllStaffCategory() {
    debugger;
    this.staffserv.getStaffCategory().subscribe({
      next: (res: any) => {
        debugger;
        this.StaffCategory.set(res.data)
      }
    })
  }

  getAllDepartment() {
    debugger;
    this.staffserv.getDepartment().subscribe({
      next: (res: any) => {
        debugger;
        this.Department.set(res.data)
      }
    })
  }


}
