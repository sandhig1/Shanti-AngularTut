import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewstate',
  imports: [FormsModule],
  templateUrl: './viewstate.html',
  styleUrl: './viewstate.css',
})
export class Viewstate {

  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router)

    stateData=signal({
    StateId :0,
    StateCode :"",
    StateName :""
   });

  constructor() {

    const id= Number(this.route.snapshot.paramMap.get('id'));
    if (id>0){
      this.Viewstate(id);
    }
  }

   goToState() {
    this.router.navigate(['state']);
  };

  Viewstate(id:number){
    debugger;
    this.http.get("http://angulartutapi.esoltechserv.com/api/state/getstateDetail?id=" + id).subscribe({
      next: (res: any) => {
        debugger;
        this.stateData.set(res.data)
      }
    })
   }
}
