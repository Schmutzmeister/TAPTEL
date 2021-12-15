import { treeTemplate } from "../classes/treeTemplate";

export let I_ds : treeTemplate = {
    treeId : "I_ds",
    nodes : [ {nodeId: "I_ds", 
            label : "Identifiability of data store",
            parent: "root", 
            childs: ["PID_ds","I_ds1"],
            childAnd : true ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: "Identifiability of data at the data store in this context means, that a data store record can be linked to a data subjects identity. Identifiability threats at a data store can occur when the data store can be accessed(PID_ds) and the data insufficiently anonymized (I\_ds1) and therefore the data can become identifiable (e.g. Posted images on a website are linked to a username, in the database the username has a user record identifying the users real identity. The posted Image is therefor identifiable). Either the data becomes identified because it is linked to (identifiable) login data(I\_ds2), or because the data is re-identified by lack of (sufficient) data minimization(I\_ds3)."},

            {nodeId: "I_ds1", 
            label : "Weak anonymization (inference)",
            parent: "I_ds", 
            childs: ["I_ds2","I_ds3"],
            childAnd : false ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: "Weak anonymization occurs when the data is identified by linking of login data (I\_ds4) and these login data is identifiable (identifiable login used of I\_e2), or if re-identification from linkable data at the data store(I\_ds3) is possible."},

            {nodeId: "I_ds2", 
            label : "Data identified by login data",
            parent: "I_ds1", 
            childs: ["I_e2","I_ds4"],
            childAnd : true ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: "Data identified by login data is possible if an identifiable login (I\_e2) is used and when there is data at the data store that is linkable to this identifiable login(I\_e4)."},

            {nodeId: "I_ds3", 
            label : "Re-identification possible",
            parent: "I_ds1", 
            childs: ["I_ds5","L_ds1"],
            childAnd : false ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: "Re-identifications becomes possible when the data is not sufficiently minimized(L\_ds) or Linked data becomes identifiable(I\_ds5). Clearly, the more linkable information is available, the more unique it becomes and hence the smaller the anonymity set."},

            {nodeId: "I_ds4", 
            label : "Data linkable to login data",
            parent: "I_ds2", 
            childs: [],
            childAnd : false ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: "Data can be linkable to a login by requirements of the system itself (e.g. a customer of an online shop needs to access his previous orders, which are linked to his login id in the database). But data can also be linkable to a login if the system does not intend to link logins to data in the data store. This can happen if data records and logins share common attributes (e.g. a user can upload images to an anonymous image board. To see or upload images the user needs to authenticate with his login, as a measure against web crawlers and bots. The uploaded images are not linked to the users account but the EXIF data of the images are not sanitized and are linkable to the device id used in the authentication process)."},

            {nodeId: "I_ds5", 
            label : "Linked data becomes identifiable",
            parent: "I_ds3", 
            childs: [],
            childAnd : false ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: "This node is actually a specific case of the L\_ds3 leaf node (data linkable to other database). When the other database contains identifiable data, like an identity management database does, the entire dataset becomes identifiable. But also aggregation of linkable data in the data store itself can eventually lead to identifiable data when the anonymity set is gradually being reduced."},

            {nodeId: "I_e2", 
            label : "Identifiable login used",
            parent: "I_ds2", 
            childs: [],
            childAnd : false ,
            treeId : "I_e",
            checkboxes: [],
            explainText: ""},

            {nodeId: "L_ds1", 
            label : "Insufficient minimization (inference)",
            parent: "I_ds3", 
            childs: [],
            childAnd : false ,
            treeId : "L_ds",
            checkboxes: [],
            explainText: ""},

            {nodeId: "PID_ds", 
            label : "Privacy Information Disclosure at data store",
            parent: "I_ds", 
            childs: [],
            childAnd : false ,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: ""},



    ]
}