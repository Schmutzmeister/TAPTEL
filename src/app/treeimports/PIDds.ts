import { treeTemplate } from "../classes/treeTemplate";

export let PID_ds : treeTemplate = {
    treeId : "PID_ds",
    nodes : [ {nodeId: "PID_ds", 
            label : "Privacy Information Disclosure at data store",
            parent: "root", 
            childs: ["PID_ds1","PID_ds2","ID_ds"],
            childAnd : false,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: "The Privacy Information Disclosure of data store tree is concerned about who has access to the records in the data store. This can either be a trusted insider(PID\_ds2) that has access to confidential information or a maybe untrusted third party(PID\_ds1) that the data is shared with. Lastly, if an Information Disclosure (ID\_ds) happens, the control about the records is completely lost and anyone can be considered to be in possession of the data stores content."},

            {nodeId: "PID_ds1", 
            label : "Data shared with untrusted party",
            parent: "PID_ds", 
            childs: [],
            childAnd : false,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: "Sharing data with untrusted parties might have many reasons. Medical facilities can use data of cancer patients for research or collaborative federated machine learning models might be trained on the date. This is mainly a threat when the data that is being disclosed is not being minimized sufficiently. When protecting a user’s privacy ideally only the minimal set of information should be provided."},

            {nodeId: "PID_ds2", 
            label : "Insider has access to data store",
            parent: "PID_ds", 
            childs: [],
            childAnd : false,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: "Employees might have access to the data store for a variety of reasons regarding their profession. Employees from customer support might be required to access customer data. Administrators and developers might need to access the data base as part of optimizing and to keep the system running, to fix issues. But, even when employees are required to access the data store, strong access control should be implemented nevertheless. Each role should only be able to access the data needed to accomplish the task."},

            {nodeId: "ID_ds", 
            label : "Information Disclosure at data store",
            parent: "PID_ds", 
            childs: [],
            childAnd : false,
            treeId : "ID_ds",
            checkboxes: [],
            explainText: "This is a STRIDE threat, please conduct a separate security analysis to decide the magnitude of this threat."},

    ]
}