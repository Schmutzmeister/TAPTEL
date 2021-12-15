import { treeTemplate } from "../classes/treeTemplate";

export let I_p : treeTemplate = {
    treeId : "I_p",
    nodes : [ {nodeId: "I_p", 
            label : "Identifiability of process",
            parent: "root", 
            childs: ["ID_p"],
            childAnd : false ,
            treeId : "I_p",
            checkboxes: [],
            explainText: "The threat tree of Identifiability of process suggests that the only way to link different actions to the same subject is by gaining access to the process itself(ID\_p). Note that this threat is very rare, since processes that digest data can be considered black boxes in most cases that process data without human interaction. While data resides inside a process it is not human readable. Storage where the process stores intermediate data or aggregated data would be considered an additional data store. The action of a user to run a process, given that it was initiated by network traffic would be considered a data flow to be examined."},

            {nodeId: "ID_p", 
            label : "Information Disclosure of process",
            parent: "I_p", 
            childs: [],
            childAnd : false,
            treeId : "ID_p",
            checkboxes: [],
            explainText: ""},



    ]
}