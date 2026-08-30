import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Stateservice } from '../../services/stateservice/stateservice';

@Component({
  selector: 'app-state',
  imports: [],
  templateUrl: './state.html',
  styleUrl: './state.css',
})
export class State {

  router = inject(Router);
  stateServ = inject(Stateservice)

  states: WritableSignal<any[]> = signal([]);

  constructor() {
    this.getAllState();
  }

  getAllState() {
    debugger;
    this.stateServ.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }

  AddState() {
    this.router.navigate(['statedetail']);
  }

  viewstate(id: number) {
    this.router.navigate(['viewstate/' + id]);
  };

  editState(id: number) {
    debugger;
    this.router.navigate(['statedetail/' + id]);
  };

  deleteState(id: number) {
    debugger;
    if (id > 0) {
      this.stateServ.deleteState(id).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status == true) {
            alert("State Deleted Successfully")
            this.getAllState();
          }
          else {
            alert("Error while Deleting State");
          }
        }
      })
    }
  }
}
