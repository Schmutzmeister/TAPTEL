import { treeTemplate } from "../classes/treeTemplate";

export let L_ds : treeTemplate = {
    treeId : "L_ds",
    nodes : [ {nodeId: "L_ds", 
            label : "Linkability of data store",
            parent: "root", 
            childs: ["L_ds1","PID_ds"],
            childAnd : true ,
            treeId : "L_ds",
            checkboxes: [],
            explainText: "Linkability in a data store occurs when one has access to the data store (PID\_ds) and when insufficient data minimization(L\_ds1) is applied. This means that too much data are being stored which enables a large set of information that can be used (e.g. by data miners) to look for links. The most obvious consequence of linking lots of information is that more pseudo-identifiers are linked which can result in identifiability (e.g. knowing one's city, gender, age or even first name does not reveal an identity, but when combined the anonymity set suddenly becomes a lot smaller and can already lead to identification, depending on the city's population size and the uniqueness of the person's first name. Thus the more data available and linkable (based on (pseudo)identifiers), the more likely the chance of identification. Another result of linkability is inference. Instead of linking data that belongs to the same person, data are linked based on certain properties to deduce relationships between them and generalize them. This can be used in a rather innocent fashion to determine the best way to organize groceries in a grocery store (e.g. people who buy hamburgers usually buy buns at the same time, hence they are stored close to each other). This inference can however also have a more judgmental nature if it is used to discriminate a certain population (e.g. people living in a certain neighborhood have a higher chance of cancer, hence their health insurance fee is higher than the surrounding cities). Inference can thus lead to societal harm."},

            {nodeId: "L_ds1", 
            label : "Insufficient Minimization / inference",
            parent: "L_ds", 
            childs: ["L_ds2","L_ds3", "L_ds4"],
            childAnd : false,
            treeId : "L_ds",
            checkboxes: [],
            explainText: "Insufficient minimization can be the case if the stored data is linkable to data in another database (L\_ds3), data is stored for too long (L\_ds4) or too much data is stored (L\_ds5). The more information is available the higher the chance of inference, which is a key element of data mining that derives ideas and conclusions by combining (linkable) information. Note that this minimization branch can also be considered from a wider perspective, when one does not (only) focus on data minimization, but also minimization of central storage, of risk, of trust, etc. This tree does however only discuss minimization of data, as it is the main concern regarding privacy."},

            {nodeId: "L_ds2", 
            label : "Data linkable to other DB (external or internal)",
            parent: "L_ds1", 
            childs: [],
            childAnd : false ,
            treeId : "L_ds",
            checkboxes: [],
            explainText: "The data can be linked to data in another database. This other database can be both internal to the system that is being analyzed or external (data from a partner company, public data online, like Facebook data, etc.). When this additional database is an identity management database that stores account data (and the login is identifiable), linking the IOIs to this database will result in identifiability."},

            {nodeId: "L_ds3", 
            label : "Storing Data to long (data retention)",
            parent: "L_ds1", 
            childs: [],
            childAnd : false ,
            treeId : "L_ds",
            checkboxes: [],
            explainText: "Storing data to long will result in an excessive amount of data being available. The more data is aggregated over time, the higher the risk of this data becoming linkable. A good practice is to delete data when it is no longer needed (e.g. the customer terminated the contract or the legal waiting periods have expired). Both data retention and data minimization threats originate from the data protection legislation principles. This tree does however only discuss minimization of data, as it is the main privacy concern regarding privacy."},
            

            {nodeId: "L_ds4", 
            label : "Storing too much Data (data minimization)",
            parent: "L_ds1", 
            childs: [],
            childAnd : false ,
            treeId : "L_ds",
            checkboxes: [],
            explainText: "The more information is available the higher the chance of inference, which is a key element of data mining that derives ideas and conclusions by combining (linkable) information. Storing more information than required for the purpose of collection (e.g. storing a subject's entire address when only his city or his country is required). This is a more gradual threat, since in many cases it is debatable what data is necessary. Both data retention and data minimization threats originate from the data protection legislation principles."},
            

            {nodeId: "PID_ds", 
            label : "Privacy Information Disclosure of data store",
            parent: "L_ds", 
            childs: [],
            childAnd : false ,
            treeId : "PID_ds",
            checkboxes: [],
            explainText: ""},
            
            
            

    ]
}