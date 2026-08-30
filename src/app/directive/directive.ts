import { NgClass, NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directive',
  imports: [NgClass,FormsModule, NgStyle],
  templateUrl: './directive.html',
  styleUrl: './directive.css',
})
export class Directive {
  divClassName : string = 'bg-success';

  addDivClass (clsName : string){
    this.divClassName = clsName
  }

  isActivechecked: boolean=true;

  inputcolorvalue = '';

  divclass={};

  changeshape(type:string){
    if (type =='Circle'){
      this.divclass={
       'background-color' : 'red',
        height:'200px',
        width:'200px',
        'border-radius':'50%',
    };
  } 
  else{
    this.divclass={
      'background-color' : 'green',
       height:'100px',
       width:'200px',
    };
  }
 }

 
}
