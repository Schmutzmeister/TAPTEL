import { treeTemplate } from "../classes/treeTemplate";

export let NR_p : treeTemplate = {
    treeId : "NR_p",
    nodes : [ {nodeId: "NR_p", 
            label : "Non-repudiation of process",
            parent: "root", 
            childs: ["NR_p1","ID_p"],
            childAnd : false ,
            treeId : "NR_p",
            checkboxes: [],
            explainText: "	Non-repudiation of a process implies that it cannot be denied that the process has been run. It is however a very rare threat. Non-repudiation of a process can be achieved in two ways. Either the process loses its confidentiality and information disclosure attacks at the process (ID\_P) are possible, or the process uses a secure log (NR\_p1) to create an overview of all actions, which can evidently be traced back to the user."},

            {nodeId: "ID_p", 
            label : "Information Disclosure of process",
            parent: "NR_p", 
            childs: [],
            childAnd : false,
            treeId : "ID_p",
            checkboxes: [],
            explainText: ""},

            {nodeId: "NR_p1", 
            label : "Process is securly logged",
            parent: "NR_p", 
            childs: [],
            childAnd : false,
            treeId : "NR_p",
            checkboxes: [],
            explainText: "If actions on the system that run processes are securely logged the subject will not be able to deny having run a process. "},




    ]
}