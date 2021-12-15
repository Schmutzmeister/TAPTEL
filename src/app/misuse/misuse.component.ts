import { Component, OnInit } from '@angular/core';
import { misuseCase } from '../classes/misuseCase';
import { assumption } from '../classes/dfdElement';
import { DataService } from '../data.service';
import { documentCheckbox, nodeDocument } from '../classes/nodeDocument';

@Component({
  selector: 'app-misuse',
  templateUrl: './misuse.component.html',
  styleUrls: ['./misuse.component.css']
})
export class MisuseComponent implements OnInit {
  selectedMis: misuseCase = null //misuseCase=null
  selectedAss: assumption=null
  misuseCases: misuseCase[]
  assumptions: assumption[]
  newAssumptions: any[]// assumption[]
  
  constructor(public dataservice : DataService) { }

  ngOnInit(): void {
    if(!this.dataservice.misuseGenerated){
      alert("This Component will not work without Misuse Cases, please generate them first in Step 3")
    }
    else{
      this.assumptions = this.dataservice.assumptions
      this.misuseCases = this.dataservice.misuseCases
      this.newAssumptions = this.dataservice.newAssumptions
    }
    
  }

  // is run when an item from the list of misusecases is selected, change of the selectedMis variable will trigger the display of its details 
  onSelectMis(mis:any){
    this.selectedMis = mis
    console.log(this.selectedMis)
    this.selectedMis.getMisactors()
  }
  // is run when an item from the list of assumptions is selected, change of the selectedAss variable will trigger the display of its details 
  onSelectAss(ass: assumption){
    this.selectedAss = ass
  }

  // converts checkbox values of node to string collection
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
