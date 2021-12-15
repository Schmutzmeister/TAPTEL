import { treeTemplate } from "../classes/treeTemplate";

export let UA_e : treeTemplate = {
    treeId : "UA_e",
    nodes : [ {nodeId: "UA_e", 
            label : "Unawareness of entity",
            parent: "root", 
            childs: ["UA_e1","UA_e2"],
            childAnd : false,
            treeId : "UA_e",
            checkboxes: [],
            explainText: "Being unaware of the consequences of sharing information. Often users are not aware of the impact of sharing data. This can be data shared to friends on facebook, but also personal information shared with other services (i.e. loyalty cards, online services, …). Unawareness threats differ from data minimization threats (L\_ds) in the sense that concerning data minimization it is the responsibility of the (back-end) system to minimize the data that are being stored, while for unawareness it is the provider of the data himself who is responsible and should be aware of the consequences of sharing (too much) information. Nevertheless, the system itself can support the users in making privacy-aware decisions. Ideally, all users (data providers) should be clearly informed and educated of the consequences of sharing data using (online) services. Our analysis can however not impact the entire society, hence these threats will only focus on the provisions the system itself can take to guide and educate the user concerning his data sharing. This threat only applies to an entity, as other DFD elements do not input additional information in the system."},

            {nodeId: "UA_e1", 
            label : "Providing too much information",
            parent: "UA_e", 
            childs: ["UA_e3","UA_e4"],
            childAnd : false ,
            treeId : "UA_e",
            checkboxes: [],
            explainText: "Unawareness often means the user provides too much (personal) information. This is specifically problematic when this information is identifiable, or when this information when combined with the already available data becomes identifiable. This threat thus closely relates to the identifiability threats concerning data minimization."},

            {nodeId: "UA_e2", 
            label : "Unaware of stored data",
            parent: "UA_e", 
            childs: [],
            childAnd : false ,
            treeId : "UA_e",
            checkboxes: ["User can not review stored data", "stored data is not provided in clear way"],
            explainText: "Often data subjects are unaware of what data a system has actually collected and stored about him. A data subject should thus always have the possibility to review his own data (i.e. data that has been collected about him)."},

            {nodeId: "UA_e3", 
            label : "no feedback and awareness tools",
            parent: "UA_e1", 
            childs: [],
            childAnd : false ,
            treeId : "UA_e",
            checkboxes: [],
            explainText: "When no feedback and awareness tools are used, the user is likely not aware of the information (or its impact) he is sharing. The user should have an easy overview about the data he revealed about himself, like a list of location date he has provided, uploaded files, sent messages. Currently some privacy-friendly techniques exist to assist the user in making aware decisions concerning the sharing of his data. When these techniques are not employed, the awareness is obviously threatened. Feedback and awareness tools (feedback tools that improve the user's understanding of privacy implications, or tools that visualize the user's data like the IdentityMirror and privacy mirrors) provide feedback on the data the user wants to share and presents its results when combined with already available (online) information. Also several types of nudges have been proposed for social networks to encourage the user to reflect on the information he wants to share sentiment nudges that inform the user how a certain message might be perceived, picture nudges that show profile pictures of (some) users that will be able to see the post, etc. Facebook already provides some privacy feedback as it it allows the user to access his timeline with the access control settings of a specific user. This raises awareness and can help prevent the oversharing of information."},

            {nodeId: "UA_e4", 
            label : "no user friendly privacy support",
            parent: "UA_e1", 
            childs: [],
            childAnd : false ,
            treeId : "UA_e",
            checkboxes: [],
            explainText: "Privacy support should be user-friendly. For example, default settings (e.g. facebook settings) should be privacy-friendly. It should be prevented that information is automatically shared with many parties, often without knowledge of the user. Privacy-friendly settings should limit the exposure of (personal) data. Also, in order for users to modify privacy settings according to their needs, the provided tools should be easy to use. The privacy configuration (e.g. Facebook privacy settings) should be easy to access and manage and should be represented in an understandable fashion."},



    ]
}