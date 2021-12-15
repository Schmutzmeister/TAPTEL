import { collectExternalReferences } from "@angular/compiler";
import { NgbSlide } from "@ng-bootstrap/ng-bootstrap";
import { nodeDocument } from "./nodeDocument";
import { treeDocument } from "./treeDocument"

export class misuseCase {
    id: number;
    activTree : treeDocument;
    activNodes : nodeDocument[]; // for each active Nodes show
    commentMisuse : string = ""



    constructor(id:number, mainTree: treeDocument){
        this.id = id
        this.activTree = mainTree
        this.activNodes = []
        this.collectNode(this.activTree.rootNode)
    }

    getMisactors():string[]{
        // for activeNodes check if PID or ID is involved
        let misactors: Set<string> = new Set
        for(let n of this.activNodes){
            if(n.nodeId == "PID_df1"||n.nodeId == "PID_ds1"){
                misactors.add("trusted/untrusted 3rd Party")
            }
            if(n.nodeId == "ID_ds"||n.nodeId == "ID_df"){
                misactors.add("Outsider")
            }
            if(n.nodeId == "PID_df2"||n.nodeId == "PID_ds2"){
                misactors.add("Trusted Insider")
            }
        }
        return Array.from(misactors)
    }
    collectNode(node: nodeDocument){
        // check if node is active or inactive
        if(!node.state){return}
        this.activNodes.push(node)

        // node has childs -> collect all childs
        if(node.childs.length>0){
            for(let child of node.childs){
                this.collectNode(child)
            }
        }
        // node has no childs, so its either inbound node or leaf node
        else{
            // case node is inbound node
            if (node.isInbound) {
                // node has directed inbound node in same DFD Element
                if(node.nodeHasOutboundInSameElement()!= null){
                    this.collectNode(node.nodeHasOutboundInSameElement())
                }
                // node is Inboundnode with multiple possible matching outbound nodes because inbound does not share DFDElement Type -> Find all active matching Outbounds
                else{
                    let tmp: nodeDocument[] =  node.getPotentialOutboundNodesFromForeignElement()
                    console.log(tmp)
                    for(let potentialOutboundNodes of tmp){
                        this.collectNode(potentialOutboundNodes)
                    }
                }
            }
            // case node is leafnode that has allready been documented, break recursion
            else{
                return
            }
        }


    }
}