import { treeTemplate } from "../classes/treeTemplate";

export let NC : treeTemplate = {
    treeId : "NC_",
    nodes : [ {nodeId: "NC_", 
            label : "Policy/Consent non-Compliance",
            parent: "root", 
            childs: ["NC_1","NC_2"],
            childAnd : false ,
            treeId : "NC_",
            checkboxes: [],
            explainText: "A system is compliant when it adheres to its communicated corporate policies, to all (data protection) legislation, and to the user's consents.	The tree only aims at identifying compliance issues (related to privacy) from a high-level perspective. To ensure full compliance, we advice the assistance of a legal expert.Legal compliance is a very complicated domain and will generally require the assistance of a legal expert. Related work exists that summarizes the most common principles in data protection legislation. Anton, Earp, and Reese [1] summarize 5 privacy protection goals as notice/awareness, choice/consent, access/participation, integrity/security, enforcement/redress. Guarda and Zannone present 9 privacy principles [2]: fair and lawful processing, consent, purpose specification, minimality, minimal disclosure, information quality, data subject control, sensitivity, and information security. Privacy policies can have several origins. They can be imposed by law (like data protection legislation), but also each company has its own corporate policies (which are also communicated with the users) to which the system should adhere. On top of that, the users themselves can also be involved in the privacy rules by means of consents. Users should be able to decide what happens with their data and who has access to their information. They can elicit their rules in the form of user consents. These consents can either be to allow certain actions to their personal information. Examples are: allow data to be used for research, or allow data to be communicated with a third party, or even allow person X to access (and/or update) my personal data). A consent can also restrict access, when a user decides he does not want a certain person or party to access his personal information (e.g. prohibit your neighbor who works in a hospital to access your medical records). Consents and privacy policies in general can, and should, be integrated into the system's access control policies as much as possible. Note that these threats are only related to privacy policies. Data protection compliance spans a much broad range of threats (most of which also occur in other LINDDUN threat trees). Those threats are mainly related to storage and overall management of data that is not compliant with legislation or the specified corporate policies. They include (but are not limited to): insufficient minimization (collecting and storing too much information with respect to its purpose), storing data too long (data retention), storing sensitive data without the necessary precautions (anonymizing, encrypting,...), not providing the data subjects with access to their data, not respecting the 'right to be forgotten', ... To guarantee full legal compliance, we advice the assistance of a legal expert."},

            {nodeId: "NC_1", 
            label : "Attacker tampering with privacy policies",
            parent: "NC_", 
            childs: [],
            childAnd : false,
            treeId : "NC_",
            checkboxes: [],
            explainText: "When the privacy policies and consents are integrated in the access control system, it is important that they are stored in a correct and consistent fashion. Clearly, when an attacker can tamper with the policies, the attacker can alter or remove the policies (and consents) and the system can no longer ensure compliance. This can happen when the database that stores the policies is susceptible to tampering threats (T\_DS of STRIDE)."},

            {nodeId: "NC_2", 
            label : "Incorrect or insufficient privacy policies",
            parent: "NC_", 
            childs: ["NC_3","NC_4"],
            childAnd : false,
            treeId : "NC_",
            checkboxes: [],
            explainText: "When the privacy policies are incorrectly or insufficiently implemented, the system will not be compliant. Privacy policies can be incorrect or inconsistent when problems with the policy management(NC\_3) or problems with the user notice(NC\_4) exist."},

            {nodeId: "NC_3", 
            label : "Inconsistent/ insufficient policy management",
            parent: "NC_2", 
            childs: [],
            childAnd : false,
            treeId : "NC_",
            checkboxes: [],
            explainText: "When insufficient policy management is provided, the system will not be compliant to the user consent requirements. Insufficient policy management exists when the system does not provide (user-friendly) support to the user to create or update user consents, or, when the created user consents are not correctly enforced in the system. This insufficient policy management can be both accidental and intentional."},

            {nodeId: "NC_4", 
            label : "insufficient notice",
            parent: "NC_2", 
            childs: [],
            childAnd : false,
            treeId : "NC_",
            checkboxes: [],
            explainText: "Also related to the system's corporate policies is the threat related to notice. Clear, transparent notice of the applied policies should be provided to all users to inform them about the data that will be collected, stored, and processed."},



    ]
}