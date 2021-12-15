import { treeDocument } from "./treeDocument"

export class dfdelement {
    id: string;
    label: string;
    eleType : string;
    x? : number;
    y? : number;
    z? : number;
    height : number;
    width : number;
    source? : string;
    target? : string;
    datafields? : string;
    boundary? :string;
    mappingSelection? : {[TT:string]:boolean}
    trees:treeDocument[]

    constructor(input: any){
        this.id = input.id
        this.label = input.label
        this.eleType = input.type
        if (!(typeof input.source === 'undefined')) { this.source= input.source; }
        if (!(typeof input.target === 'undefined')) { this.target= input.target; }
        this.datafields = ""
        this.trees = []
        this.x = input.x
        this.y = input.y
        this.mappingSelection = {}
        this.height = input.height
        this.width = input.width

    }
    // checks if dfdelement has cetain tree
    getTreeById(ele: dfdelement, id : string):treeDocument{
        for(let tree of ele.trees){
            if(tree.rootNode.nodeId == id){
                return tree
            }
        }
        return null
    }
}

export interface mappingSelection {
    li?:boolean
    id?:boolean
    nr?:boolean
    di?:boolean
    de?: boolean
    ua?:boolean
    nc?:boolean
}

export interface assumption {
    id : number
    name : string
    id_dfdelement : string
    dfdElementType : string
    threatType : string
    description : string
    scope : string
}

export const defaultMappingTable: {[ET:string]:{[TT:string]:boolean}} = {
    "store":    {"li": true, "id": true, "nr":true, "de":true, "di":true, "ua":false, "nc":true},
    "flow":     {"li": true, "id": true, "nr":true, "de":true, "di":true, "ua":false, "nc":true},
    "process":  {"li": true, "id": true, "nr":true, "de":true, "di":true, "ua":false, "nc":true},
    "entity":    {"li": true, "id": true, "nr":false, "de":false, "di":false, "ua":true, "nc":false}
}
export const tcCommonname = {
    "li":"Linkability",
    "id":"Identifiability",
    "nr":"Non-Repudiation",
    "de":"Detectability",
    "pid":"Privacy Information Disclosure",
    "di":"Information Disclosure",
    "ua":"Unawareness",
    "nc":"Non-Compliance",
}
export const dfdElementTypes: string[] = ["store", "flow", "process", "entity"]
export const threatTypes: string[]= ["li","id","nr","de","pid","ua","nc"]
export const mappingThreatTypes: string[]= ["li","id","nr","de","ua","nc"]



export interface typesMapping{
    mapping:{type:string, map: mappingSelection}[]
}




export interface potentialThreat{
    parentDfdElement : dfdelement
    threatCategory : string
    tree? : treeDocument

}

export let treeIdConversion: {[ET:string]:{[TT:string]:string}} = {
    "store":    {"li": "L_ds", "id": "I_ds", "nr":"NR_ds", "de":"D_ds", "di":"ID_ds", "ua":"UA", "nc":"NC_", "pid": "PID_ds"},
    "flow":    {"li": "L_df", "id": "I_df", "nr":"NR_df", "de":"D_df", "di":"ID_df", "ua":"UA", "nc":"NC_", "pid": "PID_df"},
    "process":    {"li": "L_p", "id": "I_p", "nr":"NR_p", "de":"D_p", "di":"ID_p", "ua":"UA", "nc":"NC_"},
    "entity":    {"li": "L_e", "id": "I_e", "nr":"NR_e", "de":"D_e", "di":"ID_e", "ua":"UA_e", "nc":"NC_"}}

// funktion die mir alle elemente eines bestimmten dfdtypes gibt
// Store, Flow, Entity, Process
export function filterElementsDfdType(type: string, elementList : dfdelement[]): dfdelement[]{
  let tmpList : dfdelement[] = [];
  for(let element of elementList){
    if(element.eleType == type){
      tmpList.push(element);
    };
  }
  return tmpList;
}