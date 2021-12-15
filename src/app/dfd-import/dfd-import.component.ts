import { sanitizeIdentifier } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { dfdelement, assumption} from '../classes/dfdElement';
import { exampleDataFlowDiagram } from 'src/data/exampleDFD';

//dfd draw functionality
import cytoscape, * as cy from 'cytoscape';


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-dfd-import',
  templateUrl: './dfd-import.component.html',
  styleUrls: ['./dfd-import.component.css'],

})
export class DfdImportComponent implements OnInit {
  //file Import and parsing
  selectedFile: File = null;
  selectedFileResult : any;
  dfdImportElements : any ; //objects from td that need to be parsed in parseJSON()  
  dfdObject : any; // object that holds whole TDJSON after Import
  dfd:any;
  printable : string;
  dfdElements: dfdelement[] = []; // hällt die tatsächlichen DFD Elemente nach dem Parsen, siehe auch dfdelements.ts
  selectedElement:dfdelement=null // selected DFD Element from DFD Diagramm

  // Tree Viewport
  cydfd: cytoscape.Core = null
  selectedNode: string = null
  that: DfdImportComponent = null

  @ViewChild('content') private content:any;

  constructor(private DataService : DataService, private modalService: NgbModal) { }

  ngOnInit(): void {
    //this.DataService.elements = this.dfdElements // link imported dfd Elements to data service
    if(Array.isArray(this.DataService.elements)){
      if(this.DataService.elements.length !=0){
        this.dfdElements = this.DataService.elements 
        if(this.DataService.dfdDiagram!=null){
          this.cydfd = this.DataService.dfdDiagram
          this.cydfd.mount(document.getElementById('cydfd'))
        }
        else{
          this.createDiagramm()
        }
      }
      
    }
  }
  
  // shows selected Filename
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    this.DataService.mappingVisited = false
    this.DataService.treesGenerated= false
    this.DataService.misuseGenerated = false
    
    let that = this
    var file = this.selectedFile;
    var reader = new FileReader();
    reader.onload = function(event) {
      that.selectedFileResult = reader.result;
      that.parseElementsFromJson()
      that.createDiagramm()
    };
    reader.readAsText(file);
  }

  // Parse JSON to DFD Object
  parseElementsFromJson(){ // nochmal output validieren
    if(!this.dfdObject){
      this.dfdObject = JSON.parse(this.selectedFileResult);
    } 
    this.dfdImportElements = this.dfdObject.detail.diagrams[0].diagramJson.cells;

    // Placeholder for Project Import Later -- to-do unused at the moment
    this.dfdElements = []


    for (let ele of this.dfdImportElements){
      let newElement : dfdelement
      let eleType : string = ele.type.replace("tm.","");
      eleType = eleType.toLowerCase()
      eleType = eleType.replace("actor","entity")
      if(ele.type !== "tm.Boundary"){
        if(eleType == "flow"){
          newElement = new dfdelement({id:ele.id,  type: eleType, label: ele.labels[0].attrs.text.text, source:ele.source.id, target:ele.target.id})
        }
        else if(eleType == "entity"||eleType == "store"||eleType == "process"){
          let x  = ele.height + ele.width
          newElement = new dfdelement({id:ele.id,  type: eleType, label: ele.attrs.text.text, x: ele.position.x, y: ele.position.y, height: ele.height, width: ele.width})
        }
      else{ // Error, some elements did not have a correct type
        alert("undefined DFDElementTypes imported: "+eleType)
      }

      if (newElement != null) {
        this.dfdElements.push(newElement); 
      }
      }
      else{
        
      }
    }
    this.DataService.elements = this.dfdElements
    this.DataService.resetFlags()
    this.DataService.dataImported = true
  }


  
  // DFD Draw Functions

  createDiagramm(){
    //reset Cytoscape canvas 
    if(this.cydfd!=null){
      this.cydfd.destroy()
    }
    
    //create initial empty diagram
    this.cydfd = cy({
      container: document.getElementById('cydfd'),
    
      boxSelectionEnabled: false,
      autounselectify: true,
    
      layout: {
        name: 'preset',
        directed: true,
        fit : true,
        padding: 30
      },
      style:
      [
        {
          selector: 'node',
          style: {
          'content': 'data(label)',
          'label': 'data(label)',
          'height': 80,
          'width': 80,
          'font-size': '22px',
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5,
          }
        },
        {
          selector: 'edge',
          style: {
            'content': 'data(label)',
            'font-size': '18px',
            'curve-style': 'unbundled-bezier',
            'control-point-distance': 100,
            'control-point-weight': 0.5, // '0': curve towards source node, '1': towards target node.
            'width': '8px', // edgeWidth varies between 2-5px
            'line-color': 'gray',
            'line-style': 'solid',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': 'black',
            'text-wrap': 'wrap',
            'text-max-width' : '200',
            'text-valign' : 'center',
            'text-halign' : 'right'
          }
        }
      ]
    })

    

    this.cydfd.userZoomingEnabled(false)
    this.parseElementsToDiagramm()
    this.cydfd.center()
    this.cydfd.fit()
    let that = this
    this.cydfd.on('tap', 'element',function(evt){
      let node = evt.target;
      that.selectElement(node.id())
      });
    this.DataService.dfdDiagram = this.cydfd
    this.cydfd.mount(document.getElementById('cydfd'))
  }

  //Opens Modal to change Attributes of DFDElement, to-do, catch dismiss events
  selectElement(node: string){
    this.selectedElement = this.getElementFromNodeId(node)
    if(this.selectedElement != null){
      this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.createDiagramm()
      })
    }
    else{
      alert("Something went wrong, Element has no valid ID in Element Collection")
    }
  }
  // gibt zur NodeID das passende DFDElement Objekt zurück
  getElementFromNodeId(nodeId: string){
    for(let n of this.dfdElements){
      if(n.id == nodeId){
        return n
      }
    }
    return null
  }
  parseElementsToDiagramm(){
    //parse Nodes
    for(let n of this.dfdElements){

      if(n.eleType == 'store'||n.eleType == 'entity'||n.eleType == 'process'){
        let lab = n.label.replace("\n"," ")//.replace(" ","").replace(" ","").replace(" ","")
        this.cydfd.add({group: 'nodes', data: { id: n.id, label: lab, type: n.eleType, height: n.height, width: n.width}, position: { x: n.x, y: n.y }})
      }
    }
    //parse Edges
    for(let n of this.dfdElements){
      if(n.eleType == 'flow'){
        this.cydfd.add({ group: 'edges', data: { id: n.id, label: n.label, type: n.eleType, source: n.source, target: n.target}})
      }
    }

    let allnodes = this.cydfd.nodes('*')
    for( let node of Array.from(allnodes)){
      let edges = node.connectedEdges()
      for(let target of Array.from(this.cydfd.nodes('*'))){
        let ctr = 30
        for(let paralleledge of Array.from(edges)){
          if(paralleledge.data('target')==target.data('id')&&paralleledge.data('source')==node.data('id')){
            paralleledge.style({'control-point-distance': ctr, 'control-point-weight': 0.4})
            console.log("SET Distance: EDGE: "+paralleledge.data('label')+"   VALUE:"+ctr)
            ctr = ctr+60
          }
        }
      } 

      if(node.data('type')=='store'){
        node.style({'shape': "rectangle"})
      }
      if(node.data('type')=='entity'){
        node.style({'shape': 'pentagon'})
      }
    }


  }


    // Some Example DFD the user can play around with
  loadMockData(){
    this.DataService.resetData()
    this.dfdObject = exampleDataFlowDiagram
    this.parseElementsFromJson()
    this.createDiagramm()
  }


  


}
