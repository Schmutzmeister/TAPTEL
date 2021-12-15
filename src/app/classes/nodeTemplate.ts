import {treeTemplate} from './treeTemplate'

export interface nodeTemplate {
    parent : string
    childs : string[]
    nodeId : string // Ex. L_df
    treeId : string
    label : string
    explainText : string // Explains this tree node to the user
    childAnd: boolean // 1 = AND , 0 = OR, determindes when childs make parent active
    checkboxes : string[]
    inbound?: boolean
    outbound?: boolean
  }




