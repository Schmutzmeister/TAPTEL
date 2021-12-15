import { treeTemplate } from "../classes/treeTemplate";

export let I_df : treeTemplate = {
    treeId : "I_df",
    nodes : [ {nodeId: "I_df", 
            label : "Identifiability of data flow",
            parent: "root", 
            childs: ["I_df1","I_df2"],
            childAnd : false ,
            treeId : "I_df",
            checkboxes: [],
            explainText: "A distinction should be made between identifiability of the contextual data (e.g. IP address necessary for communication) and the transactional data (the actual data that are being communicated). Contextual data identifiability can be resolved by, for example, anonymous routing solutions and should be applied by the sender and/or receiver to protect their own anonymity. Transactional data, however, does not necessarily have the sender or receiver as data subject, but can involve a third party subject as well (e.g. when two doctors share information about a patient, this patient is the data subject of the transactional data while he is not involved in the actual communication). Transactional data identifiability can occur when the flow is unprotected and hence information disclosure threats apply, and, when this disclosed information itself is identifiable. Another threat to transactional data identifiability exists when the data is being sent to an untrustworthy receiver (or future receiver). Transactional data identifiability should be resolved at the origin of the data or at least before the data cross a trust boundary (which can thus be much earlier in the flow than the current sender)."},

            {nodeId: "I_df1", 
            label : "Identifiability of transactional data (transmitted data)",
            parent: "I_df", 
            childs: ["PID_df","I_ds1"],
            childAnd : true ,
            treeId : "I_df",
            checkboxes: [],
            explainText: "Transactional data identifiability can occur when the transmitted data is identifiable(I\_ds2) and is disclosed (PID\_df). Note that weak anonymization(I\_ds2) is concerned only about the data that reaches the store. Identifiable data might be transmitted over a data flow from the Entity and later be anonymized at a process before the anonymized data is saved to the data store. In this case identifiability of transactional data still applies, should the data collected from the user be identifiable."},

            {nodeId: "I_df2", 
            label : "Identifiability of contextual data (metadata)",
            parent: "I_df", 
            childs: ["I_df3","I_df4"],
            childAnd : false ,
            treeId : "I_df",
            checkboxes: [],
            explainText: "This subtree is actually identical to the subtree of linkability of data flow (L\_DF2). The summary of this subtree will thus be similar as well. Contextual data becomes identifiability when non-anonymous communication that can be traced back to the entity(I\_df3) is used or an insecure anonymity system is being used (I\_df4)."},

            {nodeId: "I_df3", 
            label : "non-anonymous communication traced to entity",
            parent: "I_df2", 
            childs: [],
            childAnd : false ,
            treeId : "I_df",
            checkboxes: ["IP-Address", "Computer ID", "Device ID", "Hardware-ID", "Session ID", "Location", "Behavioral patterns", "Browser Settings"],
            explainText: "The data flow can be for example be linked based on IP address, computer iD , session ID , or even based on certain patterns (like time, frequency, and location or browser setting, etc). Communication in non-anonymous communication systems can always be linked based on the communication attributes.	Note however that is, generally speaking, easier to link data flows based on their contextual information, than actually identify (e.g. knowing that a certain user visits website X every day at 8PM will make his actions linkable based on this time pattern, however, this does not provide sufficient information to actually identify him).But, the more linkable information is available, the higher the chance of identifying the data subject. E.g. the time and IP-Address of a communication can be identifiable when combined with the logs of an ISP that show which customer leased the affected IP-Address in that time frame. The IP-Address could also be static and linkable to a website of the data subject that shows his real name in the imprint. A Mac-Address/Computer-ID/Hardware-ID/Device-ID might be linkable to the vendors order data base and identifying for the customer that bought that device."},


            {nodeId: "I_df4", 
            label : "Insecure Anonymity system deployed",
            parent: "I_df2", 
            childs: [],
            childAnd : false ,
            treeId : "I_df",
            checkboxes: ["traffic analysis possible", "passive attacks possible", "active attacks possible"],
            explainText: "It is possible that the anonymity system that is being used is insecure. This can enables traffic analysis to extract information out of patterns of traffic; passive attacks, like long-term intersection attacks, traffic correlation and confirmation, fingerprinting, epistemic attacks (route selection), and predecessor attacks; or active attacks, like N-1 attacks, Sybil attack, traffic watermarking, tagging attack, replay, and DoS attack. More information about these attacks can be found in https://www.esat.kuleuven.be/cosic/publications/article-1335.pdf."},


            {nodeId: "PID_df", 
            label : "Privacy Information Disclosure of data flow",
            parent: "I_df1", 
            childs: [],
            childAnd : false ,
            treeId : "PID_df",
            checkboxes: [],
            explainText: ""},


            {nodeId: "I_ds1", 
            label : "Weak anonymization / Inference",
            parent: "I_df1", 
            childs: [],
            childAnd : false ,
            treeId : "I_ds",
            checkboxes: [],
            explainText: ""},




    ]
}