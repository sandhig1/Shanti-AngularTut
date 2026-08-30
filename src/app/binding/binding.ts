import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '../app';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-binding',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './binding.html',
  styleUrl: './binding.css',
})
export class Binding {

  http = inject(HttpClient);
  router = inject(Router)

  
  msg = "hello World";
  selectedCase = "o";

  data1 = "SHANTI";
  data2 = "GURUNG";
  

  ProductType: string = "Laptop";
  gadgetName: string = "Mobile";

  maxAllowedChar = 6;

  myDynamicType: string = "radio";

  showWelcomeText() {
    alert("welcome to Angular App");
  }

  onDropdownChange() {
    alert("Dropdown has changed")
  }

  onMouseEnter() {
    console.log("Mouse Entered")
  }

  onMouseLeft() {
    console.log("Mouse Left")
  }

  

}
