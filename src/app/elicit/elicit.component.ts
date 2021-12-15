import { Component, OnInit } from '@angular/core';
import * as cytoscape from 'cytoscape';

import * as mockThreats from '../../data/mockTreats.json';
import * as mockTrees from '../../data/mocktrees.json';
import {threat} from '../classes/threat'

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service';
import { treeDocument } from '../classes/treeDocument';
import { nodeDocument } from '../classes/nodeDocument';
import { misuseCase } from '../classes/misuseCase';
import { assumption, dfdelement, dfdElementTypes, filterElementsDfdType } from '../classes/dfdElement';



@Component({
  selector: 'app-elicit',
  templateUrl: './elicit.component.html',
  styleUrls: ['./elicit.component.css']
})
export class ElicitComponent implements OnInit {
  myMockThreats : threat[];
  myMockTreeNodes : any;
  selectedNode: nodeDocument;
  selectedTree: treeDocument;
  myMockTrees : any;
  treeList : treeDocument[]
  potentialOutboundNodes : nodeDocument[] = []
  updatedNode : nodeDocument
  misuseCounter : number 
  misuseCases : misuseCase[]
  newAssumptions : assumption[]
  constructor(private modalService: NgbModal, public dataservice : DataService) { }
  jumpBackNode : nodeDocument
  dfdTypes: string[] = dfdElementTypes // types of dfd elements that are supported


  showDFD(){

  }

  generateMisuse(){
    //console.log("Flag genTree_"+this.dataservice.treesGenerated)
    if(!this.dataservice.treesGenerated){
      alert("Warning, No potential Threats to generate Misusecases from, please complete Step 2 first.")
    }
    else{
      this.misuseCounter = 0
      this.misuseCases = []
      for(let tree of this.treeList){
        // Rootnode Active  =  tree needs to be documented
        if (tree.rootNode.state) {
          this.misuseCases.push(new misuseCase(this.misuseCounter, tree))
          this.misuseCounter++
        }
      }
      this.dataservice.misuseCases = this.misuseCases

      this.dataservice.misuseGenerated = true
  
      this.newAssumptions = this.genNewAssumptions()
      this.dataservice.newAssumptions = this.newAssumptions
      if(this.misuseCases.length>0){
        alert(this.misuseCases.length+" MisuseCases have been generated\n "+this.dataservice.newAssumptions.length+ " Assumptions have been generated")
      }
      console.log(this.newAssumptions)
    }

  }

  genNewAssumptions():assumption[]{
    let newAssumptions = []
    let counter : number = 1
    for(let tree of this.dataservice.treeList){
      for(let node of tree.dNodes){
        if(node.comment != "" && !node.state){
          let tmpNMC = {
            id : counter,
            id_dfdelement: node.tree.parentDfd.id,
            name: node.label+" Threat for "+ node.tree.parentDfd.eleType+" : "+ node.tree.parentDfd.label+" is not applicable",
            dfdElementType : node.tree.parentDfd.eleType,
            threatType : node.nodeId.split("_")[0],
            description : node.comment,
            scope: node.nodeId+"_"+node.tree.parentDfd.label
          }
          newAssumptions.push(tmpNMC)
          counter++
        }
      }
    }
    return newAssumptions
  }

  // The user clicked the Checkbox that determines if this Node is Active or not. as a follow up action, diagram nodes need to be colored, parent nodes have to be updated, matching inbound nodes in other trees. 
  async isThreatNow(){
    this.selectedNode.state= !(this.selectedNode.state)
    console.log("value is now: "+ this.selectedNode.state)
    //Node is now active or inactive
    this.selectedTree.solveTree(this.selectedNode)
    //redraw diagramm with red nodes
    //update tree state green/gray/red
    this.updatedNode = this.selectedNode
    await this.delay(10);
    this.updatedNode = null
  }

  getSrcToDstString(dfdele : dfdelement):string{
    if(dfdele.eleType!="flow"){
        return ''
    }
    else{
      let dst = null
      let src = null
      for(let ele of this.dataservice.elements){
        if(ele.id == dfdele.source){
          src = ele.label
        }
        if(ele.id == dfdele.target){
          dst = ele.label
        }
      }
      return "Flow from '"+src+"' to '"+dst+"'"
    }
  }
  // is triggered when a tree in the treeList is clicked
  onSelectTree(tree: treeDocument, jumpback?: boolean):void{
    if(jumpback != undefined){
      if(jumpback){
        console.log("jumpback set")
        this.jumpBackNode = this.selectedNode
        this.selectedTree = tree
        this.selectedNode = this.selectedTree.rootNode
      }
      else{
        this.selectedTree = this.jumpBackNode.tree
        this.selectedNode = this.jumpBackNode
        this.jumpBackNode = null
      }
    }
    else{
      this.selectedTree = tree
      this.selectedNode = this.selectedTree.rootNode
      this.jumpBackNode = null
    }
    
    
  }

  filterDfdElementsWrapper(type: string):dfdelement[]{
    return filterElementsDfdType(type, this.dataservice.elements)
  }

  // triggered when node is clicked in Diagramm component
  selectNode(value:string){
    this.selectedNode = this.selectedTree.findNodeById(value)
    //console.log(this.selectedNode)
    //console.log(this.potentialOutboundNodes)
    if(this.selectedNode.isInbound){
      this.potentialOutboundNodes = this.selectedNode.getPotentialOutboundNodesFromForeignElement()
    }
    else{
      this.potentialOutboundNodes = []
    }
  }


  //DFD VIEW MODAL not working
  openDfd(content:any) {
    this.modalService.open(content, { windowClass: 'modaldfd'})
    //this.createDiagramm()
  }

  ngOnInit(): void {
    if(this.dataservice.treesGenerated){
      this.treeList = this.dataservice.treeList
    }
    else{
      alert("warning, no potential Threats available. This Page does not work without Threats, please complete the Mapping first")
    }
  }

  

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}



}
