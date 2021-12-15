import { treeTemplate } from "../classes/treeTemplate";

export let I_e : treeTemplate = {
    treeId : "I_e",
    nodes : [ {nodeId: "I_e", 
            label : "Identifiability of entity",
            parent: "root", 
            childs: ["I_e1","I_ds1", "I_df"],
            childAnd : false,
            treeId : "I_e",
            checkboxes: [],
            explainText: "A distinction should be made between identifiability of the contextual data (e.g. IP address necessary for communication) and the transactional data (the actual data that are being communicated). Contextual data identifiability can be resolved by, for example, anonymous routing solutions and should be applied by the sender and/or receiver to protect their own anonymity. Transactional data, however, does not necessarily have the sender or receiver as data subject, but can involve a third party subject as well (e.g. when two doctors share information about a patient, this patient is the data subject of the transactional data while he is not involved in the actual communication). Transactional data identifiability can occur when the flow is dislosed and hence privacy information disclosure threats apply, and, when this disclosed information itself is identifiable. Transactional data identifiability should be resolved at the origin of the data or at	least before the data cross a trust boundary (which can thus be much earlier in the flow than the current sender)."},

            {nodeId: "I_e1", 
            label : "Identifiable Login is disclosed",
            parent: "I_e", 
            childs: ["I_e2","PID_df"],
            childAnd : true ,
            treeId : "I_e",
            checkboxes: ["Weak client side storage"],
            explainText: "When an identifiable login(I\_e2) is used and the login in the authentication process is disclosed(PID\_df), the entity can be identifiable. It is also possible that the storage of the client is not protecting the credentials properly."},

            {nodeId: "I_e2", 
            label : "Identifiable login used",
            parent: "I_e1", 
            childs: [],
            childAnd : false ,
            treeId : "I_e",
            checkboxes: ["Real Identity used", "E-Id used", "Pseudo-Identity used", "Linkable Username used", "Insecure Token used" ,"Linkable Biometrics used", "Certificates used has to many attributes"],
            explainText: "Several types of identifiable logins exist. The most obvious is the e-id , which means using your real identity is used for the authentication/login (e.g. electronic passport). Alternatively, a pseudo-identity can be used. The most common pseudo-identity is a pseudonym, using a username-password combination. Although in theory this can provide anonymity (you can choose an unrelated username and password, or it can be assigned to you), in practice this pseudonym is often not very anonymous. Either the username can be easily linked to the user's identity (e.g. the user's firstname and/or lastname) or even the password can contain identifiable information (people tend to use easy to remember password like their birthday). Another pseudo-identifier can be a token, which can be either a hardware or software token (e.g. a smartcard, usb token, a disconnected token, a file, etc.). When the token is badly designed (either physically or implementation-wise), the entity can be identified. A final type of pseudo-identity is biometrics (e.g. fingerprints, iris scan, face unlock) that are identifiable when the biometrics themselves can be linked back to the actual identity. Another type of identifiers are certificates. They are the most privacy-friendly authentication type as they only aim at proving certain properties about the entity (e.g. older than 18, living in the US, female, etc.). The entity can however still become identifiable when the certificate contains too much (precise) properties. The more specific a certificate is (and thus unique), the more identifiable it becomes (e.g. there is only one certificate with your exact address and age)."},

            {nodeId: "I_ds1", 
            label : "Weak anonymization(inference)",
            parent: "I_e", 
            childs: [],
            childAnd : false,
            treeId : "I_ds",
            checkboxes: [],
            explainText: ""},

            {nodeId: "I_df", 
            label : "Identifiability of data flow",
            parent: "I_e", 
            childs: [],
            childAnd : false ,
            treeId : "I_df",
            checkboxes: [],
            explainText: ""},

            {nodeId: "PID_df", 
            label : "Privacy Information Disclosure at data flow",
            parent: "I_e1", 
            childs: [],
            childAnd : false,
            treeId : "PID_df",
            checkboxes: [],
            explainText: ""},



    ]
}