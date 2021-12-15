import { Component,Output, EventEmitter, Input, OnInit } from '@angular/core';
import * as cy from 'cytoscape';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { nodeDocument} from '../classes/nodeDocument';
import { treeDocument } from '../classes/treeDocument';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
  cytree: cytoscape.Core = null
  private _tree: treeDocument;
  selectedNode: string = null
  that: TreeviewComponent = null
  
    //output zurück
  @Input() set tree(value: treeDocument){
    this._tree = value
    this.drawTree(this.tree)
  }

  @Input() set redraw(value : nodeDocument){
    this.drawTree(this.tree)
  }

  @Output() selectNodeEvent = new EventEmitter<string>();


  selectNode(value: string) {
    console.log("emitted event with value "+ value)
    this.selectNodeEvent.emit(value);
  }

  constructor() { }

  // triggered from input when Listelement in treeElement is clicked, input is the treeDocument object
  drawTree(tree : treeDocument){
    console.log("drawTree")
    let that = this
    // destroy old diagram
    if(this.cytree!=null){
      this.cytree.destroy()
    }

    //generate Diagram Template
    ////////////////////////////////////
    let tmp = {
      container: document.getElementById('cy'),
    
      boxSelectionEnabled: false,
      autounselectify: true,
      userZoomingEnabled: false,
    
      elements: {
        nodes: [
          { data: { id: '1', label:'init' }}  
        ],
        edges: [
          { data: { op: "", source: '1', target: '1' }}
        ]
      },
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      },
      style:
      [
        {
          selector: 'node',
          style: {
          'content': 'data(id)',
          'label': 'data(label)',
          'height': 80,
          'width': 120,
          'font-size': 18,
          'shape': 'rectangle',
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5,
          },
        },
        {
          selector: 'edge',
          style: {
          'label': 'data(op)'
          },
        }
      ]
    }
    // pop init nodes and edges
    tmp.elements.nodes.pop()
    tmp.elements.edges.pop()
    // add all nodes from tree
    for(let n of this._tree.dNodes){
        tmp.elements.nodes.push({data: { id: n.templateNode.nodeId, label: n.templateNode.label}})
    }
    
    // add all child edges from tree
    for(let n of this._tree.dNodes){
      if(n.childs != null){
        for(let c of n.childs){
          let and
          if(n.childAnd){and = "AND"}
          else{and=""}
          tmp.elements.edges.push({ data: { op: and, source: n.templateNode.nodeId, target: c.templateNode.nodeId}})
        }
      }       
    }
    //make and draw diagram
    this.cytree = cy(tmp)
    this.cytree.userPanningEnabled(false)
    this.cytree.center()

    // lock all nodes
    let allnodes = this.cytree.nodes('*')
    for( let node of Array.from(allnodes)){
      node.lock()
      if(this._tree.getNodeByID(node.data('id')).state){
        node.style({'background-color' : '#ff9999'})
      }
      if(this._tree.getNodeByID(node.data('id')).isInbound){
        node.style({'border-color' : 'magenta', 'shape': 'ellipse'})
      }
      if(this._tree.getNodeByID(node.data('id')).isOutbound){
        node.style({'border-color' : 'blue'})
      }
    }
    // test to color single node by ID
    //let str : string = "'L_ds1'"
    //this.cytree.nodes('[id = '+str+']').style({'background-color' : '#ff9999'})


    // click node callback
    this.cytree.on('tap', 'node',function(evt){
      let node = evt.target;
      console.log( 'tapped ' + node.id() );
      that.selectNode(node.id())
      });
  }

  ngOnInit(): void {

  }

  public ngAfterViewInit(){
  }


}
