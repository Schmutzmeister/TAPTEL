import { treeTemplate } from "../classes/treeTemplate";

export let PID_df : treeTemplate = {
    treeId : "PID_df",
    nodes : [ {nodeId: "PID_df", 
            label : "Privacy Information Disclosure of data flow",
            parent: "root", 
            childs: ["PID_df1","PID_df2","ID_df"],
            childAnd : false,
            treeId : "PID_df",
            checkboxes: [],
            explainText: "The Privacy Information Disclosure of data flow tree is concerned about who has access to the content of data flows in the system. This can either be a trusted insider(PID\_df2) that has access to confidential information or a maybe untrusted third party(PID\_df1) that is relayed communication from the system or controls a network that is used for communication. Lastly, if an Information Disclosure (ID\_df) happens, the control about the data flow is completely lost and anyone can be considered to be in possession of the communications content."},

            {nodeId: "PID_df1", 
            label : "(future) receiver/communication untrusted",
            parent: "PID_df", 
            childs: [],
            childAnd : false,
            treeId : "PID_df",
            checkboxes: [],
            explainText: "Usually, communication is limited to the information flow between the user and service, but when the service transfers the flow to another service (e.g. a third party authentication service like Facebook Login), the third party has access to the data flow. Similarly, when the receiver of the data is untrustworthy (e.g. he fails to anonymize the data during processing or shares the information with other parties), the data that has been communicated, become disclosed. Note that this receiver can be the service the subject is directly communicating with, but also additional (third party) services that are used by the intended receiver of which the subject might be unaware."},

            {nodeId: "PID_df2", 
            label : "Data flow available to insider",
            parent: "PID_df", 
            childs: [],
            childAnd : false,
            treeId : "PID_df",
            checkboxes: [],
            explainText: "While employees might have access to the internal network of the company providing the system, ideally the communication of the system should be separated from the office network. Developers and administrators are the most susceptible insiders to extract data flow content. In most cases this should not be a threat since system to system communication should be encrypted even in internal networks. This can however change when high performance message queues without encryption support are used or encryption keys are provided for troubleshooting purposes. 	"},

            {nodeId: "ID_df", 
            label : "Information Disclosure at data flow",
            parent: "PID_df", 
            childs: [],
            childAnd : false,
            treeId : "ID_df",
            checkboxes: [],
            explainText: "This is a STRIDE threat, please conduct a separate security analysis to decide the magnitude of this threat."},

    ]
}