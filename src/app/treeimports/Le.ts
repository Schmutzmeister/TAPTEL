import { treeTemplate } from "../classes/treeTemplate";

export let L_e : treeTemplate = {
    treeId : "L_e",
    nodes : [ {nodeId: "L_e", 
            label : "Linkability of entity",
            parent: "root", 
            childs: ["L_e1","L_ds", "L_df"],
            childAnd : false ,
            treeId : "L_e",
            checkboxes: [],
            explainText: "These threats mainly focus on a subject (the entity) who wants to hide as much of his identifiable information (or at least make it as unlikable as possible). This can occur when the subject wants to authenticate himself to a certain service, but also during regular communication (browsing, client-server requests, etc.) by means of the contextual information used for the communication.\textbf{Self} A linkability of entity threat is applicable, when a linkability of data flow (L\_df) or likability of data store threat is present, when these system elements carry linkable data of the entity."},

            {nodeId: "L_e1", 
            label : "Linkable login disclosed",
            parent: "L_e", 
            childs: ["PID_df","L_e2"],
            childAnd : true ,
            treeId : "L_e",
            checkboxes: [],
            explainText: "A linkable login(L\_e2) will lead to linkability of the entity threat when usage of this login can be observed by an attacker. This is possible when the communication that transfers the entity's linkable credentials is disclosed by a security flaw that leads to an information disclosure of the communication. Similarly, when the receiver of the data is untrustworthy(PID\_df) (e.g. he fails to anonymize the data during processing or shares the information with other parties), the subject, and all the data he has communicated, become linkable."},
            
            {nodeId: "L_e2", 
            label : "Linkable login",
            parent: "L_e1", 
            childs: [],
            childAnd : false ,
            treeId : "L_e",
            checkboxes: ["Fixed Login is used", "detailed certificates are used"],
            explainText: "A linkable login can be a 'fixed' login, like an e-id or a username-password combination, which is being used more than once. As it is being reused, its corresponding IOIs are also linkable based on this login. Alternatively, using very detailed certificates as means of authentication can lead to linkable logins as properties of the certificate by itself are linkable. Credentials are always linkable unless anonymous/one-time credentials are used. Linking multiple actions of an entity can lead to profiling, which can have negative or positive consequences.\n \\ Example: An email address is used as login for multiple services. Example: An e-shop links the user's credentials to his product page views and thereby builds a user profile.\n Example: Certain online services are location-dependent and require users to reside in a certain country. \n This can be checked in multiple ways. Ideally the certificate (authorized by for example the government or another trusted certificate authority) only proves that the user is indeed a citizen of the required country. However, a more detailed certificate can provide the entire address of the user to prove his residence. As an address is unique (disregarding the fellow residents), the certificate becomes a linkable login."},
            
            {nodeId: "L_ds", 
            label : "Linkability at data store",
            parent: "L_e", 
            childs: [],
            childAnd : false ,
            treeId : "L_ds",
            checkboxes: [],
            explainText: ""},
            
            {nodeId: "L_df", 
            label : "Linkability of data flow",
            parent: "L_e", 
            childs: [],
            childAnd : false ,
            treeId : "L_df",
            checkboxes: [],
            explainText: ""},
            
            {nodeId: "PID_df", 
            label : "Privacy Information Disclosure at data flow",
            parent: "L_e1", 
            childs: [],
            childAnd : false ,
            treeId : "PID_df",
            checkboxes: [],
            explainText: ""}



    ]
}