import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ganeshfestival',
  imports: [FormsModule],
  templateUrl: './ganeshfestival.html',
  styleUrl: './ganeshfestival.css',
})
export class Ganeshfestival {
  
  selectedDay = signal(1);

  showDay(day: number) {
    this.selectedDay.set(day);
  }

}
