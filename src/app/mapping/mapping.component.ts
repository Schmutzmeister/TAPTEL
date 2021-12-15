import { CompileShallowModuleMetadata, TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { dfdelement, tcCommonname, defaultMappingTable, dfdElementTypes, threatTypes, assumption, typesMapping, potentialThreat, filterElementsDfdType} from '../classes/dfdElement';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
  elements: dfdelement[] = [] // List of DFD Elements 
  threatCategories: string[] = threatTypes // Categories of threats that are supported
  dfdTypes: string[] = dfdElementTypes // types of dfd elements that are supported
  typesMapping2 :  {[ET:string]:{[TT:string]:boolean}} = null  
  defaultMapping : {[ET:string]:{[TT:string]:boolean}} = defaultMappingTable // default mapping table of all threat categories to dfd element types
  assumptions : assumption[] = this.dataService.assumptions // List of assumptions that are generated when user modifies the mapping
  tcCommonName : {[TT:string]:string} = tcCommonname //  common name of LINDDUN Threat Category, for example : tcCommonname["li"] = "Linkability" 
  ds : any = null
  assumptionIDs : Set<number> = new Set()

  constructor(private dataService: DataService) { }

  // initializing MappingTable with first visit
  ngOnInit(): void {
    this.ds = this.dataService
       // Data is imported and Mapping is visited the first time
       if(this.CollNotEmpty(this.dataService.elements) && this.dataService.dataImported){
         console.log("dataservice.elements not empty")
        // import elements from dataservice
        this.elements = this.dataService.elements;
        // first visit: populate typesmapping, assumptions and link in dataservice
        if(!this.dataService.mappingVisited&&this.dataService.dataImported){
         console.log("mapping visited first time")
          this.restoreDefaults()
          this.dataService.assumptions = this.assumptions
          this.dataService.typesMapping = this.typesMapping2
          this.dataService.mappingVisited = true
        }
        // consecutive visit, read Typesmapping, assumptions from data service
        else{
         console.log("mapping visited second time")
          this.typesMapping2 = this.dataService.typesMapping
          this.assumptions = this.dataService.assumptions
          this.updateIds()
        }
      }
      else{
        alert("warning, no DFD Elements available. This Page does not work without a DFD import")
      }
  }



  // modifies mapping for Threatcategory on dfdElementType 
  changeElementMapping(item:dfdelement, tcType:string){
    // if deselected, then this function is called, but boolean changes after this function has run, therefor true=checkbox has been disabled
    if(item.mappingSelection[tcType]){
      this.createAssumption(item.eleType, tcType, item.label, item.id)
    }
    // checkbox has been selected, the assumption needs to be deleted
    else{
      this.deleteAssumption(item.eleType, tcType, item.label, item.id)
    }
    console.log(this.dataService.assumptions)
  }
  // change mapping of an dfdelement type 
  changeTypeMapping(dfdType: string, threatType: string){
    let tmpElements: dfdelement[]= filterElementsDfdType(dfdType, this.elements)
    
    if(this.typesMapping2[dfdType][threatType]){
      for(let ele of tmpElements){
        ele.mappingSelection[threatType] = false
      }
      
      this.deleteAssumption(dfdType, threatType,"*")
      this.createAssumption(dfdType, threatType, "*")
    } 
    else{
      for(let ele of tmpElements){
        ele.mappingSelection[threatType] = true
      }
      this.deleteAssumption(dfdType, threatType,"*")
      this.updateIds()
    }
  }

  // checks for the next free assumption ID, returns lowest ID that is not in set of IDs 
  getNextAssumptionID():number{
    let counter : number = 1
    while(true){
      if(!this.assumptionIDs.has(counter)){
        return counter
      }
      counter++
    }
  }

  filterDfdElementsWrapper(type: string):dfdelement[]{
    return filterElementsDfdType(type, this.elements)
  }

  // quick check of collection is empty
  CollNotEmpty(col:any[]){
    if(!Array.isArray(col)||col.length ==0){return false}
    return true
  }
  //creates Assumption objects and puts them into the Assumption List
  // dfdTypes : {store, process, entity, flow}
  // threatTypes : {li, id, nr, de, di, ua, nc}
  // scope: {*, dfdElement.label}
  // dfdElementId: optional, only used when single X is removed
  //
  //
  createAssumption( dfdType:string, threatType: string,scope: string, dfdElementId?: string){
    let IdAss: string = ""
    let displayName :string = "" 
    if(scope == "*"){
      IdAss = dfdType+"_"+threatType
      displayName = this.tcCommonName[threatType]+" Threats for "+dfdType+"s are not evaluated"
    }
    else{
      IdAss = dfdElementId
      displayName = this.tcCommonName[threatType]+" Threats for "+dfdType+" : "+scope+" are not evaluated"
    }
    let newId = this.getNextAssumptionID()
    let tmpAssumption : assumption = {
      id :  newId,
      name : displayName,
      id_dfdelement: IdAss,
      dfdElementType : dfdType,
      threatType : threatType,
      description : "",
      scope: threatType.toUpperCase()+"_"+dfdType.toUpperCase()+"_"+scope}
    console.log(tmpAssumption)
    console.log(this.assumptionIDs)
    this.assumptionIDs.add(newId)
    this.assumptions.push(tmpAssumption)
    //update data service
  }
  deleteAssumption(dfdType:string, threatType: string, scope: string, dfdElementId?: string){
    // case we want to remove all assumptions of a certain type for certain dfdElement

    console.log("called deleteAss:"+dfdType+" : "+threatType+" : "+scope )
    if(scope == "*"){
      this.assumptions = this.assumptions.filter(function(ele){
        return !(ele.dfdElementType == dfdType && ele.threatType == threatType);
      });
      this.updateIds()
      console.log(this.assumptions)
    }
    else{
      this.assumptions = this.assumptions.filter(function(ele){
        return !(ele.id_dfdelement == dfdElementId && ele.threatType == threatType);
      });
      this.updateIds()
    }
    this.dataService.assumptions = this.assumptions
  }

  // restores Mapping defaults from template, deletes all assumptions, resets TypesMapping
  restoreDefaults(){
    if(!this.dataService.dataImported){
      alert("Warning, no Elements to apply the default mapping on. Please Import your DFD first in Step 1")
    }
    else{
      this.resetElementMapping()
      this.resetTypesMapping()
      this.clearAssumptions()
    }

  }
  updateIds():void{
    let assumptionIDs : Set<number> = new Set()
    for( let a of this.assumptions){
      assumptionIDs.add(a.id)
    }
    this.assumptionIDs = assumptionIDs
    this.assumptions = this.assumptions.sort(function(a, b) {
      return (a.id - b.id);
  })
  }
  //restore defaults on all elements
  resetElementMapping(){
    for(let tmpObj of this.elements){
      if(dfdElementTypes.includes(tmpObj.eleType)){
        tmpObj.mappingSelection.li = defaultMappingTable[tmpObj.eleType]["li"];
        tmpObj.mappingSelection.id = defaultMappingTable[tmpObj.eleType]["id"];
        tmpObj.mappingSelection.nr = defaultMappingTable[tmpObj.eleType]["nr"];
        tmpObj.mappingSelection.de = defaultMappingTable[tmpObj.eleType]["de"];
        tmpObj.mappingSelection.di = defaultMappingTable[tmpObj.eleType]["di"];
        tmpObj.mappingSelection.ua = defaultMappingTable[tmpObj.eleType]["ua"];
        tmpObj.mappingSelection.nc = defaultMappingTable[tmpObj.eleType]["nc"];
      }
    }
  }
  //populate typesmapping, which is used to group multiple assumptions 
  resetTypesMapping(){
    this.typesMapping2 = {
      "store":    {"li": true, "id": true, "nr":true, "de":true, "di":true, "ua":false, "nc":true},
      "flow":     {"li": true, "id": true, "nr":true, "de":true, "di":true, "ua":false, "nc":true},
      "process":  {"li": true, "id": true, "nr":true, "de":true, "di":true, "ua":false, "nc":true},
      "entity":    {"li": true, "id": true, "nr":false, "de":false, "di":false, "ua":true, "nc":false}
    }
    this.dataService.typesMapping = this.typesMapping2
  }
      // clear assumption list
  clearAssumptions(){
    this.assumptions = []
    this.dataService.assumptions = this.assumptions
  }

  // generates potential threats, applied current mapping on DfdElements
  genTrees(){
    if(!this.dataService.mappingVisited){
      alert("Warning, no Mapping exists to generate potential Threats")
    }
    else{
      this.dataService.generateTrees()
      if(this.dataService.treeList.length>0){
        alert(this.dataService.treeList.length + " Trees have been generated")
      }
    }
  }
}
