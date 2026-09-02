import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stateservice } from '../../services/stateservice/stateservice';

@Component({
  selector: 'app-statedetail',
  imports: [FormsModule],
  templateUrl: './statedetail.html',
  styleUrl: './statedetail.css',
})
export class Statedetail {
   router = inject(Router);
   route = inject(ActivatedRoute);
   stateServ = inject(Stateservice);
    
    stateData:WritableSignal<any>=signal({
      StateId :0,
      StateCode:"",
      StateName:""
    });


   constructor(){
    const id= Number(this.route.snapshot.paramMap.get('id'));

    if (id>0){
      this.getStateDetail(id);
    }
   }

  goToState() {
    this.router.navigate(['state']);
  };

  getStateDetail(id:number){
    debugger;
     this.stateServ.getStateDetail(id).subscribe({
      next: (res: any) => {
        debugger;
        this.stateData.set(res.data)
      }
    })
  }

  saveState(formRef:NgForm){
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

    if (this.stateData().StateId<=0){
      this.stateServ.saveState(this.stateData()).subscribe({
        next: (res: any) => {
          if (res.status==true){
            alert("State Saved Successfully")

            this.getStateDetail(0);
          }
          else{
            alert("Error while saving State");
            console.log("Error while saving State : " + res.msg);
          }
        }
      })
    }

    else{
      this.stateServ.updateState(this.stateData()).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status==true){
            alert("State Updated Successfully")
          }
          else{
            alert("Error while Updating State");
            console.log("Error while updating State : " + res.msg);
          }
        }
      })
    }
  }
  }

}
