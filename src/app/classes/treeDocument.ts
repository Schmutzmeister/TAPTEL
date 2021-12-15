import { dfdelement, potentialThreat, treeIdConversion } from "./dfdElement"
import { nodeDocument } from "./nodeDocument"
import { treeTemplate } from "./treeTemplate"

/*
    treeDocument instances are generated for each threat Category of an DFDElement that was not deselected in the mapping step
    they represent potential Threats and the TreeDocument instance holds the users input and his decisions if this threat is considered to be a problem
    TreeDocument Objects will build their nodes from the Template imported in the Treegenerator.
    */

export class treeDocument {
    rootNode : nodeDocument // NodeID der Rootnode =  TreeID
    dNodes : nodeDocument[] = [] // document Nodes
    parentDfd : dfdelement
    treeIdConversion : {[ET:string]:{[TT:string]:string}} = treeIdConversion
    treeList : treeDocument[]
    

    treeTemplate :treeTemplate


    constructor(dfdE : dfdelement, treeTemplate: treeTemplate, treeList : treeDocument[]){
        this.parentDfd = dfdE
        this.treeTemplate = treeTemplate
        this.generateNodes()
        this.linkNodes()
        this.treeList = treeList
    }

    generateNodes(){
       for(let nodeTemplate of this.treeTemplate.nodes){
           this.dNodes.push(new nodeDocument(nodeTemplate,this))
       } 
    }

    // chanedNode : node that changed state. Propagate the value up the tree and if it is an outbound node, propagate to inbound nodes of trees for the same dfdelement
    solveTree(changedNode:nodeDocument){
        //console.log("Solving:"+changedNode.tree.rootNode.nodeId+" : "+changedNode.nodeId)
        let p: nodeDocument = null // parent node of changedNode
        // propagate state if node is outbound node, propagate to inbound nodes with same ID in trees of same DFD ELement
        if (changedNode.isOutbound) {
            for (let tree of this.parentDfd.trees){
                let potentialInbound : nodeDocument = tree.getNodeByID(changedNode.nodeId)
                if(potentialInbound != null && potentialInbound.isInbound){
                    potentialInbound.state = changedNode.state
                    this.solveTree(potentialInbound)
                }
            }            
        }

        if (changedNode.parent!=null) {
            p = changedNode.parent
        }
        // if we reach root, end solving
        else{
            return
        }

        // check if one child of node.parent is true, or at least one is false
        let oneTrue : boolean = false
        let oneFalse : boolean = false
        for(let c of p.childs){
            if(!c.isActive()){
                oneFalse = true
            }
            if (c.isActive()) {
                oneTrue = true
            }
        }
        // and operator between childs
        if (p.childAnd) {
            
            // case that one child is inactive for and AND catenation between childs
            if (oneFalse) {
                p.state = false
            }
            // case that all childs are active for AND Catenation -> parent is also active
            else{
                p.state = true
            }
        }
        // or operator between childs
        else{
            // at least one child is active
            if (oneTrue) {
                p.state = true
            }
            // no childs are active
            else{
                p.state = false
            }
        }
        // solve tree recusive , call parent 

        //console.log("changed Node:"+changedNode.nodeId+" value: "+ changedNode.state)
        changedNode.tree.solveTree(p)
    }

    linkNodes(){
        for(let node of this.dNodes){
            // find and set parent Node
            let parent: nodeDocument = this.findNodeById(node.templateNode.parent)
            if(parent!=null){
                node.parent = parent
            }
            // find and set child nodes
            let childs: nodeDocument[]  = []
            for(let n of node.templateNode.childs){
                let child : nodeDocument = this.findNodeById(n)
                if(child != null){
                    childs.push(child)
                }
            }
            node.childs = childs
            // set root node of tree
            if(node.templateNode.parent == "root"){
                this.rootNode = node
            }
        }
    }

    findNodeById(nodeId : string):nodeDocument{
        for(let n of this.dNodes){
            if(n.nodeId == nodeId){
                return n
            }
        }
        return null
    }

    treeIsActive():boolean{
        if (this.rootNode.isActive()==true) {
            return true
        }
        else return false
    }

    treeIsInactive():boolean{
        if (this.rootNode.isActive()==false) {
            return true
        }
        else return false
    }

    treeIsUnsolved():boolean{
        if (this.rootNode.isActive()==null) {
            return true
        }
        else return false
    }
    // checks if tree has certain nodeid
    getNodeByID(id :string):nodeDocument{
        for(let node of this.dNodes){
            if(node.nodeId == id){
                return node
            }
        }
        return null
    }

}
