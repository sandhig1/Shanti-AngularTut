import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewenquiry',
  imports: [FormsModule],
  templateUrl: './viewenquiry.html',
  styleUrl: './viewenquiry.css',
})
export class Viewenquiry {

    
    http = inject(HttpClient);
  
    route = inject(ActivatedRoute)



    enquiryData=signal({
    EnquiryId :0,
    EnquiryNo:"",
    EnquiryDate:"",
    CustomerName:"",
    CustomerAddress:"",
    PhoneNo:"",
    EmailAdd:"",
    EnquiryDetail:""
  });

   constructor() {

    const id= Number(this.route.snapshot.paramMap.get('id'));
    if (id>0){
      this.Viewenquiry(id);
    }
  }
   
   //viewenquiry: WritableSignal<any[]> = signal([]);

   Viewenquiry(id:number){
    debugger;
    this.http.get("http://angulartutapi.esoltechserv.com/api/enquiry/getenquiryDetail?id=" + id).subscribe({
      next: (res: any) => {
        debugger;
        this.enquiryData.set(res.data)
      }
    })
   }
}
