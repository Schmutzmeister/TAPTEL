import { Injectable } from '@angular/core';
import { assumption, dfdelement, potentialThreat} from './classes/dfdElement';
import { treeDocument } from './classes/treeDocument';
import { treeGenerator } from './classes/treeGenerator';
import { misuseCase } from './classes/misuseCase';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  elements: dfdelement[]
  assumptions : assumption[]
  dfdDiagram: cytoscape.Core = null
  typesMapping :  {[ET:string]:{[TT:string]:boolean}}
   // trees for Step 3
  treeList: treeDocument[] = []
  misuseCases : misuseCase[]
  newAssumptions : assumption[]
  
  mappingVisited : boolean = false 
  dataImported : boolean = false
  treesGenerated : boolean = false
  misuseGenerated : boolean = false

 


  constructor() { }

  // is called when user imports new DFD Elements
      // Hier wird der Text der Datei ausgegeben
  resetFlags(){
    this.mappingVisited = false
    this.dataImported = false
    this.treesGenerated = false
    this.misuseGenerated = false
  }
  resetData(){
    this.elements = []
    this.assumptions = []
    this.treeList = []
    this.newAssumptions = []
    this.misuseCases = []
    this.resetFlags
  }
  clear():void{
    this.elements = null;
  }

  // generates trees for Step 3
  generateTrees(){
    //reset Trees
    this.treeList = []
    // create Treegenerator and generate Trees for all DfdElements
    let tg:treeGenerator = new treeGenerator()
    this.treeList = tg.generateTrees(this.elements)
    this.treesGenerated = true
    this.misuseGenerated = true

  }
  
}
