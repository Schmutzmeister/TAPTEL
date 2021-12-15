import { treeTemplate } from "../classes/treeTemplate";

export let NR_df : treeTemplate = {
    treeId : "NR_df",
    nodes : [ {nodeId: "NR_df", 
            label : "Non-repudiation of data flow",
            parent: "root", 
            childs: ["NR_df1","NR_df2","NR_df3","NR_df4"],
            childAnd : false ,
            treeId : "NR_df",
            checkboxes: [],
            explainText: "Non-repudiation of a data flow implies that the subject cannot deny having sent a message. This can occur when data sources of flows are insufficiently obfuscated, when weak deniable encryption, MACs are used/not used, or weak off-the-record messaging are used."},

            {nodeId: "NR_df1", 
            label : "Insuficient data sources or data flow obfuscation",
            parent: "NR_df", 
            childs: [],
            childAnd : false ,
            treeId : "NR_df",
            checkboxes: ["No automatic replay of broadcast", "decrypted log of all network connections", "insufficient protection against censors", "insufficient obfuscation of data extensions"],
            explainText: "Insufficient obfuscation for data sources or data flows means, that the attacker can gain access to at least part of the data flow or data source. This can occur in a number of cases, for example, there is no automatic replay of broadcasts, such that the sender of a file is sufficiently distinguishable from those who are merely relaying it. Another example is when a complete decrypted log of all network connections to and from a user's computer is disclosed, resulting in the disclosure of the origin of data flow. Insufficient obfuscation of data extensions, such that operators or users of the network are able to know where the data comes from.  The final examples are that there is insufficient protection against censors as censoring always involves an analysis of the communicated data based on predefined attributes. If identifiable data from the data subject is flagged and securely logged it is hard to deny having sent the message."},

            {nodeId: "NR_df2", 
            label : "No or weak deniable encryption",
            parent: "NR_df", 
            childs: [],
            childAnd : false ,
            treeId : "NR_df",
            checkboxes: ["private keys disclosed", "provable that data are encrypted", "colluding users prove together that the data are encrypted", "colluding users can cooperate and show the decrypted message", "data can be decrypted to plaintext", "Cryptoanalysis possible"],
            explainText: "The second type of threat is that little or a weak deniable encryption technique is used to protect the data flow. One possible attack path is to prove data is encrypted, either the encrypter proves the data is obviously an encryption or colluding users prove together that the data is encrypted. \n Another attack path is to prove data can be decrypted to a valid plain text, which can occur when the encrypter decrypts the file or colluding users can cooperate and show the decrypted message. Typically encrypted data needs to decrypted in the future to be of any use. But there are cases where the data subject might not want to be able to decrypt the data himself, because he could be forced to do it (e.g. A whistleblower might want to gather compromising information but knows that his own keys would be disclosed in case of an investigation. He encrypts the gathered information with the public keys of different trusted third parties. The whistleblower will not be able to decrypt the data himself anymore but is still able to disclose the information to the selected parties). The third attack path is that all private keys are disclosed, which clearly enables decryption. Finally, also cryptanalysis can be possible to attack the used encryption scheme if it is not secure."},
	

            {nodeId: "NR_df3", 
            label : "No /weak message authentication is used/not used",
            parent: "NR_df", 
            childs: [],
            childAnd : false ,
            treeId : "NR_df",
            checkboxes: ["MACs used", "Weak MACs used", "No MACs used"],
            explainText: "Message authentication codes (MACs) are used to ensure integrity of a sent message, which means that the message has not been manipulated. If secure MACs are used, this creates a non-repudiation threat, since a subject can not deny that the message has not been modified. On the other hand, if no MACs or weak MACs are used, the missing integrity of data flow content enables an attacker to forge authentic looking messages and pretend that a certain data flow comes from a subject. There is no definitive answer which case is the bigger threat, since repudiation builds on plausible deniability and it is at the discretion of the observer/inspector whether denial is plausible."},


            {nodeId: "NR_df4", 
            label : "No or weak OTR",
            parent: "NR_df", 
            childs: [],
            childAnd : false ,
            treeId : "NR_df",
            checkboxes: [ "replaying of previous transferred messages",  "Signatures are used"],
            explainText: "The final threat indicates that there is little or a weak Off-the-Record Messaging (OTR) used, such that in a conversation it is not possible to provide both deniability for the conversation participants and confidentiality of conversations content at the same time. Possible attack paths include replaying of previous transferred messages, and the use of signatures to demonstrate communication events, participants and communication content."},




    ]
}