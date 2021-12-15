import { treeTemplate } from "../classes/treeTemplate";

export let D_ds : treeTemplate = {
    treeId : "D_ds",
    nodes : [ {nodeId: "D_ds", 
            label : "Detectability of data store",
            parent: "root", 
            childs: ["D_ds1","D_ds2"],
            childAnd : false ,
            treeId : "D_ds",
            checkboxes: [],
            explainText: "Knowing that an item of interest (IOI) exists, without actually having access to it, can already reveal (possibly sensitive) information. For example, knowing that a rehab clinic has a file on a certain celebrity, already reveals information (i.e. the celebrity has been in rehab), without actually having access to the file."},

            {nodeId: "D_ds1", 
            label : "IOIs are disclosed",
            parent: "D_ds", 
            childs: ["D_ds3","PID_ds"],
            childAnd : true ,
            treeId : "D_ds",
            checkboxes: [],
            explainText: "When weak information hiding(D\_ds3) at the stat store is present and the content of the data store is disclosed(PID\_ds), then IOIs are disclosed, this means the attacker the data records are dislosed to can observe their existence."},

            {nodeId: "D_ds2", 
            label : "Interaction reveal existence of IOIs",
            parent: "D_ds", 
            childs: [],
            childAnd : false ,
            treeId : "D_ds",
            checkboxes: [],
            explainText: "When an attacker can interact with the data store and make request, he might be able to deduce the existence of certain IOIs in the data store. E.g. the attacker tries to login to an website with the data subjects email address and the systems responds with 'wrong password', he now knows that the subject has an account on this website. The same would apply when the attacker tries to register a new account with the subjects email and receives the massage 'email already taken'. Similarly, a technician might not be able to look up a patients record in a medical data base but can check when a records has been updated, which tells him if a patient is in active treatment."},


            {nodeId: "D_ds3", 
            label : "Weak information hiding",
            parent: "D_ds1", 
            childs: [],
            childAnd : false ,
            treeId : "D_ds",
            checkboxes: ["Steganalysis attacks possible"],
            explainText: "With weak information hiding, information is revealed due to weak steganography algorithms. This enables detection of IOIs due to steganalysis attacks."},


            {nodeId: "PID_ds", 
            label : "Privacy Information Disclosure at data store",
            parent: "D_ds1", 
            childs: [],
            childAnd : false ,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: ""},




    ]
}