import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiryservice } from '../../services/enquiryservice/enquiryservice';
import { NgClass } from "../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-enquirydetail',
  imports: [FormsModule],
  templateUrl: './enquirydetail.html',
  styleUrl: './enquirydetail.css',
})
export class Enquirydetail {

  router = inject(Router);
  route = inject(ActivatedRoute);
  enquiryServ = inject(Enquiryservice);
  
  enquiryData:WritableSignal<any>=signal({
    EnquiryId :0,
    EnquiryNo:"",
    EnquiryDate:"",
    CustomerName:"",
    CustomerAddress:"",
    PhoneNo:"",
    EmailAdd:"",
    EnquiryDetail:""
  });

  constructor(){
    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getEnquiryDetail(id);
    }
  }
  
  getEnquiryDetail(id:number){
    debugger;
    this.enquiryServ.getEnquiryDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.enquiryData.set(res.data)
      }
    })
  }

  goToEnquiryList() {
    this.router.navigate(['enquiry']);
  };

  saveEnquiry(formRef:NgForm){
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
      alert("Error while saving Doctor.");
    }
    else{

    if (this.enquiryData().EnquiryId<=0){
      this.enquiryServ.saveEnquiry(this.enquiryData()).subscribe({
        next: (res: any) => {
          if (res.status==true){
            alert("Enquiry Saved Successfully")

            this.getEnquiryDetail(0);
          }
          else{
            alert("Error while saving Enquiry");
            console.log("Error while saving Enquiry : " + res.msg);
          }
        }
      })
    }

    else{
      this.enquiryServ.updateEnquiry(this.enquiryData()).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status==true){
            alert("Enquiry Updated Successfully")
          }
          else{
            alert("Error while Updating Enquiry");
            console.log("Error while updating Enquiry : " + res.msg);
          }
        }
      })
    }
  }
}

}
