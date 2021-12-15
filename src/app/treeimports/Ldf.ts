import { treeTemplate } from "../classes/treeTemplate";

export let L_df : treeTemplate = {
    treeId : "L_df",
    nodes : [ {nodeId: "L_df", 
            label : "Linkability of Data Flow",
            parent: "root", 
            childs: ["L_df1","L_df2"],
            childAnd : false ,
            treeId : "L_df",
            checkboxes: [],
            explainText: "A distinction should be made between linkability of the contextual data (e.g. IP address necessary for communication) and the transactional data (the actual data that are being communicated). Contextual data linkability can be resolved by, for example, anonymous routing solutions and should be applied by the sender and/or receiver to protect their own unlinkability. Transactional data, however, does not necessarily have the sender or receiver as data subject, but can involve a third party subject as well (e.g. when two doctors share information about a patient, this patient is the data subject of the transactional data while he is not involved in the actual communication)."},

            {
            nodeId: "L_df1", 
            label : "Linkability of transactional data (transmitted data)",
            parent: "L_df", 
            childs: ["PID_df","L_ds1"],
            childAnd : true ,
            treeId : "L_df",
            checkboxes: [],
            explainText: "Transactional data linkability can occur when the transmitted data is linkable(L\_ds2) and is disclosed (PID\_df). Note that insufficient minimization (L\_ds2) is concerned only about the minimization of the data that reaches the store. Too much data might be transmitted over a data flow and later be aggregated at a process before the minimized data is saved to the data store. In this case linkability of transactional data still applies."},

            {nodeId: "L_df2", 
            label : "Linkability of Contextual Data (metadata)",
            parent: "L_df", 
            childs: ["L_df3","L_df4"],
            childAnd : false,
            treeId : "L_df",
            checkboxes: [],
            explainText: "Contextual data becomes linkable when non-anonymous communication (L\_df3) is used or an insecure anonymity system is being used (L\_df4)."},

            {nodeId: "L_df3", 
            label : "non-anonymous communications are linked",
            parent: "L_df2", 
            childs: [],
            childAnd : false,
            treeId : "L_df",
            checkboxes: ["IP-Address", "Computer ID", "Device ID", "Hardware-ID", "Session ID", "Location", "Behavioral patterns", "Browser Settings"],
            explainText: "The data flow can be for example be linked based on IP address, computer iD , session ID , or even based on certain patterns (like time, frequency, and location or browser setting, etc). Communication in non-anonymous communication systems can always be linked based on the communication attributes."},

            {nodeId: "L_df4", 
            label : "Insecure Anonymity System Deployed",
            parent: "L_df2", 
            childs: [],
            childAnd : false ,
            treeId : "L_df",
            checkboxes: ["traffic analysis possible", "passive attacks possible", "active attacks possible"],
            explainText: "It is possible that the anonymity system that is being used is insecure. This can enables traffic analysis to extract information out of patterns of traffic; passive attacks, like long-term intersection attacks, traffic correlation and confirmation, fingerprinting, epistemic attacks (route selection), and predecessor attacks; or active attacks, like N-1 attacks, Sybil attack, traffic watermarking, tagging attack, replay, and DoS attack. More information about these attacks can be found in https://www.esat.kuleuven.be/cosic/publications/article-1335.pdf."},

            {nodeId: "PID_df", 
            label : "Privacy Information Disclosure of data flow",
            parent: "L_df1", 
            childs: [],
            childAnd : false,
            treeId : "PID_df",
            checkboxes: [],
            explainText: ""},

            {nodeId: "L_ds1", 
            label : "Insufficient minimization (inference)",
            parent: "L_df1", 
            childs: [],
            childAnd : false,
            treeId : "L_ds",
            checkboxes: [],
            explainText: ""},
            


    ]
}