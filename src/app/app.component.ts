import { Component } from '@angular/core';
import { DataService } from './data.service';
import { saveAs } from 'file-saver';
import { assumption, dfdelement } from './classes/dfdElement';
import { treeDocument } from './classes/treeDocument';
import { misuseCase } from './classes/misuseCase';
import { nodeDocument } from './classes/nodeDocument';
import { Router } from '@angular/router';

const {parse, stringify, toJSON, fromJSON} = require('flatted');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TAPTEL - Tool Assisted Privacy Threat Elicitation with LINDDUN';
  activeRouterLink: any = null
  mybool : boolean = false
  dataImported : boolean = this.dataService.dataImported
  threatsGenerated : boolean = false
  misuseGenerated : boolean = false
  ds : any = null


  constructor(private dataService: DataService, public router: Router) { 
    this.ds = this.dataService

  }

  // Saves Objects that are worked on to a JSON File.
  saveProject(){

    const {parse, stringify, toJSON, fromJSON} = require('flatted');
    let exportData : exportInterface = new exportInterface()
    let FileSaver = require('file-saver')

    exportData.dataImported = this.dataService.dataImported
    exportData.mappingVisited = this.dataService.mappingVisited
    exportData.treesGenerated = this.dataService.treesGenerated
    exportData.misuseGenerated = this.dataService.misuseGenerated

    // push Data to export object
    if(exportData.dataImported){
      exportData.elements = this.dataService.elements
      if(exportData.mappingVisited){
        exportData.elements = this.dataService.elements
        exportData.assumptions = this.dataService.assumptions
        exportData.typesMapping = this.dataService.typesMapping
        if(exportData.treesGenerated){
          exportData.treeList= this.dataService.treeList
          if(exportData.misuseGenerated){
            exportData.newAssumptions = this.dataService.newAssumptions
            exportData.misuseCases= this.dataService.misuseCases
          }
        }
      }
    }
    let blob = new Blob([stringify(exportData)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "taptel.json");
  }
  loadProject(event : any){
    let selectedFile = <File>event.target.files[0];
    let that = this
    var reader = new FileReader();
    this.dataService.resetData()

    // do if file is finished loading
    reader.onload = function(event) {
      let result = reader.result
      that.parseProjectLoadFile(result)
    };
    reader.readAsText(selectedFile);
  }

  parseProjectLoadFile(loadFile : any){

    const {parse, stringify, toJSON, fromJSON} = require('flatted');
    let importData : exportInterface = parse(loadFile)

    for(let e of importData.elements){
      Object.setPrototypeOf(e, dfdelement.prototype)
      for(let t of e.trees){
        Object.setPrototypeOf(t, treeDocument.prototype)
        for(let n of t.dNodes){
          Object.setPrototypeOf(n, nodeDocument.prototype)
        }
      }
    }
    for(let m of importData.misuseCases){
      Object.setPrototypeOf(m, misuseCase.prototype)
    }
    // ned this?
    for(let t of importData.treeList){
      Object.setPrototypeOf(t, treeDocument.prototype)
    }
    
    this.dataService.dataImported = importData.dataImported
    this.dataService.mappingVisited = importData.mappingVisited
    this.dataService.treesGenerated = importData.treesGenerated
    this.dataService.misuseGenerated = importData.misuseGenerated

    // push Data to export object if corresponding step has been executed
    if(this.dataService.dataImported){
      this.dataService.elements = importData.elements
      if(this.dataService.mappingVisited){
        this.dataService.elements = importData.elements
        this.dataService.assumptions = importData.assumptions
        this.dataService.typesMapping = importData.typesMapping
        if(this.dataService.treesGenerated){
          this.dataService.treeList= importData.treeList
          if(this.dataService.misuseGenerated){
            this.dataService.misuseCases= importData.misuseCases
            this.dataService.newAssumptions = importData.newAssumptions
          }
        }
      }
    }
    this.router.navigate([''])
  }
}

export class exportInterface{
  mappingVisited? : boolean
  dataImported? : boolean
  treesGenerated? : boolean
  misuseGenerated? : boolean

  elements? : dfdelement[]
  misuseCases? : misuseCase[]
  assumptions? : assumption[]
  treeList? : treeDocument[]
  newAssumptions? : assumption[]
  typesMapping? :  {[ET:string]:{[TT:string]:boolean}}
}