import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controlflow',
  imports: [FormsModule],
  templateUrl: './controlflow.html',
  styleUrl: './controlflow.css',
})
export class Controlflow {

  isDivVisible: boolean = true;

  toggleDiv() {
    this.isDivVisible = !this.isDivVisible
  }

  isoffer: boolean = false;

  orderstatus: string = "N";

  cityList = ["Pune", "Nagpur", "Mumbai", "Thane", "Solapur"];

  studentList = [
    { studId: 111, name: 'Sandhi', city: 'pune', rollNo: 121 },
    { studId: 112, name: 'Shanti', city: 'nagpur', rollNo: 122 },
    { studId: 113, name: 'Ajay', city: 'mumbai', rollNo: 123 },
    { studId: 114, name: 'Kishore', city: 'thane', rollNo: 124 },
    { studId: 115, name: 'Mukesh', city: 'solapur', rollNo: 125 }
  ];

  selectedStudent = ''

}
