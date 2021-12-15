import { treeTemplate } from "../classes/treeTemplate";

export let L_p : treeTemplate = {
    treeId : "L_p",
    nodes : [ {nodeId: "L_p", 
            label : "Linkability of process",
            parent: "root", 
            childs: ["L_p1","ID_p"],
            childAnd : true ,
            treeId : "L_p",
            checkboxes: [],
            explainText: "The threat tree of linkability of process suggests that the only way to link different actions to the same subject is by gaining access to the process itself(ID\_p) and that the processed information is linkable(L\_p1). Note that this threat is very rare, since processes that digest data can be considered black boxes in most cases that process data without human interaction. While data resides inside a process it is not human readable in most cases. Storage where the process stores intermediate data or aggregated data would be considered an additional data store. The action of a user to run a process, given that it was initiated by network traffic would be considered a data flow."},

            {nodeId: "ID_p", 
            label : "Information Disclosure of process",
            parent: "L_p", 
            childs: [],
            childAnd : false,
            treeId : "L_df",
            checkboxes: [],
            explainText: ""},


            {nodeId: "L_p1", 
            label : "Processed information can be linked",
            parent: "L_p", 
            childs: [],
            childAnd : false,
            treeId : "L_p",
            checkboxes: [],
            explainText: "The process needs to have an input of linkable data for a linkability threat to apply. Note that the process in itself is also considered to be linkable data. If the process has a property that can be linked to an entity this might be a problem."},
    ]
}