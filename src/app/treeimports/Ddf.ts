import { treeTemplate } from "../classes/treeTemplate";

export let D_df : treeTemplate = {
    treeId : "D_df",
    nodes : [ {nodeId: "D_df", 
            label : "Detectability of data flow",
            parent: "root", 
            childs: ["D_df1","D_df2","D_df3","D_df4","D_df5"],
            childAnd : false,
            treeId : "D_df",
            checkboxes: [],
            explainText: "Knowing that a message is sent, without actually knowing what is contained in the message, can often reveal additional (sensitive) information. For example, when a smart grid system only sends consumption messages from the customer’s home system to the back-end when electricity is being consumed, detecting that such a message is sent to the back-end reveals that there are currently people in the house. (In practice, certain household appliances will still be consuming electricity, even though nobody is home. Therefore, detecting messages being sent at irregular or very short intervals, will reveal that someone is home."},

            {nodeId: "D_df1", 
            label : "No or weak covered channel",
            parent: "D_df", 
            childs: [],
            childAnd : false,
            treeId : "D_df",
            checkboxes: ["Too much bandwidth from a legitimate channel", "characteristics of the communications medium controlled or examined", "checking file opening and closing operations patterns possible", "timing of requests visible"],
            explainText: "	A first type of threat that can lead to detectability of a data flow is that the system lacks a covert channel (D\_df1). This can happen when the covert channel uses too much bandwidth from a legitimate channel, resulting in the detection of the covert communication. It can also be because the patterns or characteristics of the communications medium of the legitimate channel are controlled or examined by legitimate users, e.g. checking file opening and closing operations patterns or watching the timing of requests, such that covert communication is detected."},

            {nodeId: "D_df2", 
            label : "side channel attacks",
            parent: "D_df", 
            childs: [],
            childAnd : false,
            treeId : "D_df",
            checkboxes: ["based on timing information", "based on power consumption", "based on electromagnetic leaks"],
            explainText: "Side channel analysis can be based on timing information, power consumption, electromagnetic leaks, etc. It is used as an extra source of information which can be exploited to detect the communication."},

            {nodeId: "D_df3", 
            label : "Weak information hiding",
            parent: "D_df", 
            childs: [],
            childAnd : false,
            treeId : "D_df",
            checkboxes: ["steganalysis attacks are possible"],
            explainText: "	When weak information hiding techniques (D\_DF3) are used, steganalysis attacks are possible (detecting messages hidden using steganography)."},

            {nodeId: "D_df4", 
            label : "No/insuficient dummy traffic",
            parent: "D_df", 
            childs: [],
            childAnd : false,
            treeId : "D_df",
            checkboxes: [],
            explainText: "Transmitted data can become detectable when there is no or insufficient dummy traffic sent at some lower layer of the communication network, such that messages fail to appear random for all parties except the sender and the recipient(s)."},

            {nodeId: "D_df5", 
            label : "Weak spread spectrum communication",
            parent: "D_df", 
            childs: [],
            childAnd : false,
            treeId : "D_df",
            checkboxes: ["Eavesdropping possible", "gaining information Jamming/inference possible", "Fading possible"],
            explainText: "The detectability threat can occur because of a weak spread spectrum communication, resulting in deficiencies in the establishment of secure communications (allowing eavesdropping), insufficient resistance to natural interference and jamming, and insufficient resistance to fading. Jamming can reveal information when an anticipated action is prevented or interrupted.  An example for detectability of an Data flow from jamming would be a whistleblower that is in the process of uploading sensitive data about his company, the attacker can observe the upload but cant track the device uploading the data. By jamming all wireless access points after another he can observe when the upload stops and gains information about the location of the whistleblower. Fading describes the the effect of radio frequency signals fading to adjacent frequencies, which of course increases the likelyhood of the detection of such a signal."},



    ]
}