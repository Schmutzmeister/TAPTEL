import { dfdelement, potentialThreat } from "./dfdElement"
import { nodeTemplate } from "./nodeTemplate"
import { treeDocument } from "./treeDocument"

export class nodeDocument {
    checkboxes : documentCheckbox[] // checkboxclass, will be presented in the nodeDocumentView. User can check these Options null = no decision, true = does apply, false = does not apply 
    comment : string                // Userinput to add context from the user to the ThreatNode. Will reoccure in summary at misusecases
    state : boolean = false
    tree : treeDocument
    templateNode : nodeTemplate
    parent : nodeDocument   // parent nodes, needed for Tree traversal
    childs : nodeDocument[]       // childs, needed for tree traversal
    nodeId : string         // Signatur der ThreatNode Ex. L_df2
    treeId : string         // Signature of the Tree, Ex. L_df, the node is in
    label : string          // Common display name of the Node Ex. "Linkability of Metadata"
    childAnd: boolean       // 1 = AND , 0 = OR, determindes when childs make parent an active threat
    isInbound : boolean = false
    isOutbound : boolean = false


    // needs nodeTemplate from import and a Tree ne node is associated to
    constructor(nodeTemplate: nodeTemplate, tree : treeDocument){
        // default values for nodes that will be affected by user input
        this.comment = ""
        this.checkboxes = []

        // general for boolean values
        // true, false are chosen values, null means no choice has been made so far
        for(let box of nodeTemplate.checkboxes){
            // choice of checkbox is initialized with null to show that no decision has been made yet
            this.checkboxes.push({text:box,choice:false})
        }

        // immutable node properties
        this.templateNode = nodeTemplate
        this.nodeId = nodeTemplate.nodeId
        this.treeId = nodeTemplate.treeId
        this.label = nodeTemplate.label
        this.childAnd = nodeTemplate.childAnd
        this.tree = tree
        this.isInbound = nodeTemplate.inbound
        this.isOutbound = nodeTemplate.outbound

    }
    isActive():boolean{
        return this.state
    }
    // if this node is inbound we must make a list of possible matching outbound nodes 
    isInboundNode():boolean{
        if(!(this.getNodeSignature()==this.tree.rootNode.nodeId)){
            return true
        }
        else{
            return false
        }
    }
    getNodeSignature(){
        return this.nodeId.replace(/[0-9]/g, '');
    }

    // If outbound node for this inbound node can not be found in trees of the same element, then it is a foreign Inbound node
    isInboundFromForeignTree():boolean{
        if(!this.isInbound){
            return false
        }
        for (let tree of this.tree.parentDfd.trees){
            let potentialInbound: nodeDocument = tree.getNodeByID(this.nodeId)
            if(potentialInbound != null && potentialInbound.isOutbound){
                return false
            }
        }
        return true
    }
    // checks if inbound node has matching outbound node in the same dfd Element, output is the found node or null
    nodeHasOutboundInSameElement():nodeDocument{
        if(!this.isInbound){return null}
        for(let tree of this.tree.parentDfd.trees){
            for(let potentialOutbound of tree.dNodes){
                if(potentialOutbound.nodeId == this.nodeId && !potentialOutbound.isInbound){
                    return potentialOutbound
                }
            }
        }
        return null
    }
    // searches for all potential inputs for the selected inbound node
    // if its a native Inbound node, meaning that the corresponding outbound node can be found in the trees of the same element, then only these are returned
    getPotentialOutboundNodesFromForeignElement():nodeDocument[]{
        let tmpOutboundNodeList : nodeDocument[] = []
        let treeListToSearch : treeDocument[]= []
        if(this.isInboundFromForeignTree()){
            treeListToSearch = this.tree.treeList
        }
        else{
            treeListToSearch = (this.tree.parentDfd.trees)
        }
        for(let tree of treeListToSearch){
        for(let node of tree.dNodes){
            if(node.isOutbound&&node.nodeId == this.nodeId){
            tmpOutboundNodeList.push(node)
            }
        }
        }
        return tmpOutboundNodeList
    }
}
// interface for checkbox options
export interface documentCheckbox {
    text : string
    choice : boolean
}