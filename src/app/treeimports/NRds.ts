import { treeTemplate } from "../classes/treeTemplate";

export let NR_ds : treeTemplate = {
    treeId : "NR_ds",
    nodes : [ {nodeId: "NR_ds", 
            label : "Non-repudiation of a data store",
            parent: "root", 
            childs: ["NR_ds1","NR_ds2", "PID_ds"],
            childAnd : false ,
            treeId : "NR_ds",
            checkboxes: [],
            explainText: "Non-repudiation in the data store refers to the threat where a subject is not able to deny certain data in the database. This can be either data he has stored himself or data that others have stored about the subject. This can happen when no or weak deniable encryption(NR\_ds1) is applied on the stored data or when the subject wanting deniability can not edit the database(NR\_ds2) and finally if the content of the data store is disclosed(PID\_ds) and it contains data about or from the subject."},

            {nodeId: "NR_ds1", 
            label : "No or weak deniable encryption",
            parent: "NR_ds", 
            childs: [],
            childAnd : false ,
            treeId : "NR_ds",
            checkboxes: ["Provable that data is encrypted", "Provable that data can be decrypted to plaintext"],
            explainText: "When little or a weak deniable encryption is used to protect the data, it can be proven that data are an encryption or can be decrypted to a valid plaintext."},

            {nodeId: "NR_ds2", 
            label : "Person wanting deniability cannot edit database",
            parent: "NR_ds", 
            childs: [],
            childAnd : false ,
            treeId : "NR_ds",
            checkboxes: ["not able to edit own data in the database", "impossible to remove or alter someone else's data concerning the user himself"],
            explainText: "If subjects want deniability but are not able to edit data in the database to cover their tracks, their data becomes non-repudiable. It can be either impossible to remove or alter the user's own data or impossible to remove or alter someone else's data concerning the user himself. Note that this threat does not apply solely to a database that can be directly accessed by the user. It applies to all collected data. For example, Google has to implement the 'right to be forgotten' which allows data subjects to request removal of personal information from Google's search index if the links are inadequate, irrelevant or no longer relevant, or excessive in relation to the purposes for which they were processed. This is actually an extension of the unawareness threat regarding data reviewal (UA\_e5) in the unawareness tree). Not only should a subject be aware of the data that is collected about him (U), he should also be able to revoke it (NR)"},

            {nodeId: "PID_ds", 
            label : "Privacy Information Disclosure at a data store",
            parent: "NR_ds", 
            childs: [],
            childAnd : false ,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: ""},

    ]
}