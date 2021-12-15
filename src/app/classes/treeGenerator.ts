import { D_df } from "../treeimports/Ddf";
import { D_ds } from "../treeimports/Dds";
import { D_p } from "../treeimports/Dp";
import { I_df } from "../treeimports/Idf";
import { I_ds } from "../treeimports/Ids";
import { I_e } from "../treeimports/Ie";
import { I_p } from "../treeimports/Ip";
import { L_df } from "../treeimports/Ldf";
import { L_ds } from "../treeimports/Lds";
import { L_e } from "../treeimports/Le";
import { L_p } from "../treeimports/Lp";
import { NC } from "../treeimports/NC";
import { NR_df } from "../treeimports/NRdf";
import { NR_ds } from "../treeimports/NRds";
import { NR_p } from "../treeimports/NRp";
import { PID_df } from "../treeimports/PIDdf";
import { PID_ds } from "../treeimports/PIDds";
import { UA_e } from "../treeimports/UAe";
import { dfdelement, threatTypes, treeIdConversion} from "./dfdElement";
import { nodeDocument } from "./nodeDocument";
import { nodeTemplate} from "./nodeTemplate";
import { treeDocument } from "./treeDocument";
import { treeTemplate } from "./treeTemplate";
/*

    Task of the Treegenerator is to import all treeTemplate Files in src/app/treeimports
    The Treegenerator manages the generation of treeDocument Instances for all DfdElements.
    For each Element, a treeDocument is generated for each threat category marked as true in dfdElement.mappingselection, based on the matching treeTemplate template.
*/
export class treeGenerator {
    inboundSignatures : Set<string>
    importedTrees : treeTemplate[] = [
        L_e,
        L_df,
        L_ds,
        L_p,
        I_e,
        I_df,
        I_ds,
        I_p,
        D_df,
        D_ds,
        D_p,
        NR_df,
        NR_p,
        NR_ds,
        UA_e,
        NC,
        PID_df,
        PID_ds
    ]
    constructor(){
        this.inboundSignatures = new Set()
        // sets inbound flag for all inbound nodes
        for(let treeTemplate of this.importedTrees){
            for(let nodeTemplate of treeTemplate.nodes){
                nodeTemplate.inbound = this.isInboundNode(nodeTemplate, treeTemplate)
                if(nodeTemplate.inbound){
                    this.inboundSignatures.add(nodeTemplate.nodeId)
                }
                
            }
        }
        //set outbound flag for all outbound nodes
        for(let treeTemplate of this.importedTrees){
            for(let nodeTemplate of treeTemplate.nodes){
                if(this.inboundSignatures.has(nodeTemplate.nodeId)&&!(nodeTemplate.inbound)){
                    nodeTemplate.outbound = true
                }
            }
        }


    }
    // checks if Node is foreign in Tree
    isInboundNode(node:nodeTemplate, tree: treeTemplate):boolean{
        if(!(this.getNodeSignature(node)==tree.nodes[0].nodeId)){
            return true
        }
        else{
            return false
        }
    }
    //clears the Node Number from the ID to get the TreeID
    getNodeSignature(node: nodeTemplate){
        return node.nodeId.replace(/[0-9]/g, '');
    }

    // generates the Trees
    generateTrees(dfdElements: dfdelement[]):treeDocument[]{
        let treeList : treeDocument[]= []
        //let unqiueTrees : Set<string> = new Set()                                               // empty TreeList
        for(let element of dfdElements){  
            element.trees = []                                                          // do for all DfdElements
            for(let tt of threatTypes){                                                 // do for all Treat Categories
                if(element.mappingSelection[tt]){                                       // do only if mapping for the threat category is true
                    let templateTree = this.findImportedTree(element.eleType,tt)        // load template for (dfdElementType,threatCategory)
                    if(templateTree != null){
                        let newTree = new treeDocument(element, templateTree, treeList) // generate new treeDocument for element from template)
                        // CLEANUP
                        //if(!unqiueTrees.has(newTree.rootNode.nodeId)){
                            element.trees.push(newTree)
                            treeList.push(newTree)
                            //unqiueTrees.add(newTree.rootNode.nodeId)
                        //}
                                                      
                    }       
                              
                }
            }
            // created special PID trees if one of the trees of the element has an inbound node of it
            let piddf = false
            let pidds = false
            for(let tree of element.trees){
                if(element.eleType == "flow")
                if(tree.getNodeByID("PID_df")!=null){
                    piddf = true
                }
                if(tree.getNodeByID("PID_ds")!=null){
                    pidds = true
                }
            }
            if (piddf && element.eleType == "flow") {
                let templateTree = this.findImportedTree("flow","pid")       // load template for (dfdElementType,threatCategory)
                if(templateTree != null){
                    let newNode = new treeDocument(element, templateTree, treeList)        // generate new treeDocument for element from template)
                    element.trees.push(newNode)
                    treeList.push(newNode)                       
                }   
            }
            if (pidds && element.eleType == "store") {
                let templateTree = this.findImportedTree("store","pid")       // load template for (dfdElementType,threatCategory)
                if(templateTree != null){
                    let newNode = new treeDocument(element, templateTree, treeList)        // generate new treeDocument for element from template)
                    element.trees.push(newNode)
                    treeList.push(newNode)                
                }   
            }
        }
        /// CLEANUP
        ////////////// sammle alle inboundnodes
        /*
        let s: nodeDocument[]  = []//new Set()
        for(let o of this.importedTrees){
            for(let r of o.nodes){
                // if node is not native to tree
                if(r.inbound){
                    console.log("OutBound Node detected: "+ r.nodeId + " Tree: "+ o.nodes[0].nodeId)
                }
            }
        }

        //print alle inbound
        /*for(let p of Array.from(s)){
            console.log("InBound Node detected: "+ p.nodeId + "Tree: "+ p.tree.rootNode.nodeId)
        }
        /*
        // setze alle outbound Nodes
        for(let o of treeList){
            for(let r of o.dNodes){
                // wenn nodeID ist in Inbound Liste und node selbst keine Inbound Node ist, dann muss es outbound node sein
                if(s.has(r.nodeId)&&!(r.isInbound)){
                    console.log("outbound Node gefunden: "+ r.nodeId+" Tree: "+ o.rootNode.nodeId)
                    r.isOutbound = true
                }
            }
        }
        //sammle alle Outbound
        let t  = new Set()
        for(let o of treeList){
            for(let r of o.dNodes){
                if(r.isOutbound){
                    t.add(r.nodeId)
                }
            }
        }
        //print alle outbound
        for(let p of t){
            console.log("Outbound Node detected: "+ p)
        }
        */
        return treeList
    }

    // finds matching Tree in Imported Trees for dfdelementType and ThreatType
    findImportedTree( dfdET : string, tt :string){
       /* CLEANUP if(tt=="nc"){
            console.log("Search tree for:"+dfdET+": "+tt)
        }*/
        for( let iTree of this.importedTrees){
            if(this.ctti(dfdET, tt)== iTree.treeId){
                //console.log("found treetemplate :"+iTree.treeId)
                return iTree
            }
        }
        return null
    }
    // convert Threat Category and DFDElementType to Tree ID
    ctti( dfdET:string, tt:string):string{
        let tmp : {[ET:string]:{[TT:string]:string}}  = treeIdConversion
        let ret : string = tmp[dfdET][tt]
        return ret
    }
}