import { treeTemplate } from "../classes/treeTemplate";

export let D_p : treeTemplate = {
    treeId : "D_p",
    nodes : [ {nodeId: "D_p", 
            label : "Detectability of process",
            parent: "root", 
            childs: ["ID_p"],
            childAnd : false,
            treeId : "D_p",
            checkboxes: [],
            explainText: "	Detectability of process implies that it can be detected that the process has been run. It is however a very rare threat. Detectability of a process can only occur after information disclosure of this process (ID\_P). We therefore refer to that tree."},

            {nodeId: "ID_p", 
            label : "Information Disclosure of process",
            parent: "D_p", 
            childs: [],
            childAnd : false ,
            treeId : "ID_p",
            checkboxes: [],
            explainText: ""},



    ]
}
