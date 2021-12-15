import { Component, OnInit } from '@angular/core';
import { assumption } from '../classes/dfdElement';
import { misuseCase } from '../classes/misuseCase';
import { documentCheckbox } from '../classes/nodeDocument';
import { DataService } from '../data.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  assumptions : assumption[]
  misuseCases : misuseCase[]
  newAssumptions : assumption[]

  
  constructor(public dataservice : DataService) { }

  ngOnInit(): void {
    if(!this.dataservice.mappingVisited){
      alert("Warning, there is nothing to print, generate data first")
    }
    else{
      if(!this.dataservice.misuseGenerated){
        alert("Warning, No Misusecases, generate them in Step 3. If you only want to print your assumptions from the Mapping, proceed.")
        this.assumptions = this.dataservice.assumptions
      }
      else{
        this.assumptions = this.dataservice.assumptions
        this.misuseCases = this.dataservice.misuseCases
        this.newAssumptions = this.dataservice.newAssumptions
      } 
    }
   
  }

  print(){
    window.print();
  }
  getCheckboxesAsColl(checkboxes : documentCheckbox[]):string[]{
    let trueBoxes = []
    for(let box of checkboxes){
      if(box.choice){
        trueBoxes.push(box.text)
      }
    }
    return trueBoxes
  }

}
