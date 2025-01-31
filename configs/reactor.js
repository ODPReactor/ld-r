const configGraph =
    process.env.CONFIG_GRAPH || "http://virtuoso.localhost/configurations";

export default {
    // config = scope + spec
    // scope is one the 15 combination of dataset, resource, property and object
    config: {
        //---------depth 1------------
        dataset: {
            generic: {
                resourceFocusType: [],
                //only allow to view data -> disable edit
                readOnly: 1,
                //used for pagination in resource list
                maxNumberOfResourcesOnPage: 20,
                allowResourceNew: 1,
                allowResourceDelete: 0,
                allowResourceClone: 0,
                allowPropertyNew: 1,
                allowPropertyDelete: 0,
                //datasetReactor: ["Dataset"],
                //datasetViewer: ["BasicResourceList"]
                datasetReactor: ["PatternNetwork"],
                datasetViewer: ["PatternNetwork"]
            },
            // "http://virtuoso.local/users": {
            //     readOnly: 1,
            //     resourceFocusType: [
            //         "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#User"
            //     ],
            //     resourceLabelProperty: [
            //         "http://xmlns.com/foaf/0.1/accountName"
            //     ],
            //     allowPropertyNew: 1
            // },
            [configGraph]: {
                readOnly: 0,
                allowResourceClone: 1,
                allowPropertyDelete: 1,
                allowResourceNew: 1,
                allowPropertyNew: 1,
                allowNewValue: 1,
                allowResourceDelete: 1,
                resourceFocusType: [
                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#ReactorConfig",
                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#ServerConfig",
                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#FacetsPropertyConfig",
                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#FacetsConfig",
                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#EnvState"
                ],
                datasetLabel: ["LD-R Configurations"],
                resourceLabelProperty: [
                    "http://www.w3.org/2000/01/rdf-schema#label"
                ]
            }
            /*	    'http://dati.beniculturali.it/sparql/': {
		readOnly: 0,
                //allowInlineConfig: 0,
                resourceFocusType: ['https://w3id.org/arco/ontology/arco/CulturalProperty'],
                //resourceLabelProperty: ['http://xmlns.com/foaf/0.1/name'],
                datasetLabel: ['ArCo']
	    }
*/
        },
        resource: {
            generic: {
                //if enabled, will categorize properties in different tabs based on property categories
                usePropertyCategories: 0,
                propertyCategories: [],
                //used when creating random resources
                dynamicResourceDomain: ["http://example.org"],
                resourceReactor: ["Resource"]
            },
            "http://dbpedia.org/ontology/EducationalInstitution": {
                treatAsResourceType: 1,
                usePropertyCategories: 1,
                propertyCategories: ["General", "Specific"]
            }
        },
        property: {
            generic: {
                propertyReactor: ["IndividualProperty"],
                //following are object-based scope:
                objectReactor: ["IndividualObject"],
                //to view/edit individual object values
                objectIViewer: ["BasicIndividualView"],
                objectIEditor: ["BasicIndividualInput"],
                extendedOEditor: ["BasicIndividualDetailEdit"],
                extendedOViewer: ["BasicIndividualDetailView"],
                shortenURI: 1
            },
            /* All the opla annotated pattern will be treated by Pattern reactor
            ____________________________________________________________________*/
            "http://ontologydesignpatterns.org/opla/isPatternInstanceOf": {
                propertyReactor: ["Pattern"]
            },
            "http://ontologydesignpatterns.org/opla/belongsToPatternInstance": {
                isHidden: 1
            },
            "http://ontologydesignpatterns.org/opla/hasPatternInstanceMember": {
                isHidden: 1
            },
            "http://xmlns.com/foaf/0.1/depiction": {
                objectIViewer: ["BasicImageView"]
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#password": {
                label: ["Password"],
                objectIViewer: ["PasswordView"],
                objectIEditor: ["PasswordInput"],
                allowNewValue: 0
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#cloneOf": {
                isHidden: 0,
                readOnlyProperty: 0,
                allowPropertyDelete: 1
            },
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                allowPropertyDelete: 0,
                allowNewValue: 1,
                objectIViewer: ["PrefixBasedView"],
                objectIEditor: ["PrefixBasedInput"]
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataType": {
                allowPropertyDelete: 0,
                objectIViewer: ["PrefixBasedView"],
                objectIEditor: ["PrefixBasedInput"]
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#createdBy": {
                isHidden: 0,
                allowNewValue: 0,
                allowPropertyDelete: 0,
                readOnlyProperty: 1,
                objectIViewer: ["BasicLinkedIndividualView"],
                containerDatasetURI: ["http://ld-r.org/users"]
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#createdOn": {
                isHidden: 1,
                allowNewValue: 0,
                allowPropertyDelete: 0,
                readOnlyProperty: 1
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resourceQuery": {
                decodeURIComponent: 1
            },
            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#selection": {
                decodeURIComponent: 1
            }
        },
        //---------depth 2------------
        dataset_resource: {
            "http://virtuoso.local/users": {
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#User": {
                    treatAsResourceType: 1,
                    resourceReactor: ["UserResource"]
                }
            }
        },
        dataset_property: {
            //for configuration manager
            [configGraph]: {
                "http://www.w3.org/2000/01/rdf-schema#label": {
                    allowPropertyDelete: 0,
                    label: ["Description"],
                    allowNewValue: 0
                },
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    isHidden: 0,
                    shortenURI: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#templateResource": {
                    label: ["The Template Resource"],
                    hint: [
                        "If set, this resource will be used as template for new resources."
                    ],
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope": {
                    hint: ["Determines the type of scope in LD-R"],
                    objectIEditor: ["BasicOptionInput"],
                    objectIViewer: ["BasicOptionView"],
                    options: [
                        { label: "Dataset", value: "D" },
                        { label: "Resource", value: "R" },
                        { label: "Property", value: "P" },
                        { label: "Dataset-Resource", value: "DR" },
                        { label: "Dataset-Property", value: "DP" },
                        { label: "Resource-Property", value: "RP" },
                        { label: "Dataset-Resource-Property", value: "DRP" }
                    ],
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset": {
                    shortenURI: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property": {
                    shortenURI: 0,
                    objectIViewer: ["PrefixBasedView"],
                    objectIEditor: ["PrefixBasedInput"]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource": {
                    shortenURI: 0,
                    objectIViewer: ["PrefixBasedView"],
                    objectIEditor: ["PrefixBasedInput"]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resourceFocusType": {
                    shortenURI: 0,
                    objectIViewer: ["PrefixBasedView"],
                    objectIEditor: ["PrefixBasedInput"]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resourceLabelProperty": {
                    shortenURI: 0,
                    objectIViewer: ["PrefixBasedView"],
                    objectIEditor: ["PrefixBasedInput"]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#config": {
                    label: ["Configuration"],
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#label",
                                instances: [
                                    { value: "Label", valueType: "literal" }
                                ]
                            },
                            config: {
                                label: ["Label"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                                instances: [
                                    {
                                        value:
                                            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#FacetsPropertyConfig",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                label: ["Type"],
                                objectIViewer: ["PrefixBasedView"],
                                objectIEditor: ["PrefixBasedInput"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property",
                                instances: [
                                    {
                                        value: "http://example.com/prop1",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                label: ["Property"],
                                objectIViewer: ["PrefixBasedView"],
                                objectIEditor: ["PrefixBasedInput"]
                            }
                        }
                    ]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#constraint": {
                    label: ["Constraint"],
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [
                        {
                            spec: {
                                propertyURI:
                                    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
                                instances: [
                                    {
                                        value:
                                            "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#Constraint",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                label: ["Type"],
                                objectIViewer: ["PrefixBasedView"],
                                objectIEditor: ["PrefixBasedInput"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property",
                                instances: [
                                    {
                                        value: "http://exampleProperty.com",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                label: ["Property"],
                                objectIViewer: ["PrefixBasedView"],
                                objectIEditor: ["PrefixBasedInput"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#object",
                                instances: [
                                    { value: "value", valueType: "literal" }
                                ]
                            },
                            config: {
                                label: ["Object Value"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#enabled",
                                instances: [
                                    { value: "1", valueType: "literal" }
                                ]
                            },
                            config: {
                                label: ["Enabled"],
                                objectIViewer: ["ToggleView"],
                                objectIEditor: ["ToggleEdit"],
                                onValue: ["1"],
                                offValue: ["0"]
                            }
                        }
                    ]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#list": {
                    shortenURI: 0,
                    objectIViewer: ["PrefixBasedView"],
                    objectIEditor: ["PrefixBasedInput"]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#treatAsResourceType": {
                    label: ["Treat as Resource Type"],
                    hint: [
                        "If set to true, will consider resource URI as type URI for resource"
                    ],
                    objectIViewer: ["ToggleView"],
                    objectIEditor: ["ToggleEdit"],
                    onValue: ["1"],
                    offValue: ["0"],
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#useReasoning": {
                    label: ["Use Reasoning?"],
                    objectIViewer: ["ToggleView"],
                    objectIEditor: ["ToggleEdit"],
                    onValue: ["1"],
                    offValue: ["0"],
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#host": {
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#port": {
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#path": {
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#protocol": {
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#graphName": {
                    label: ["Graph Name"],
                    hint: ['use "default" to consider all graph names'],
                    allowNewValue: 0
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#endpointType": {
                    label: ["Endpoint Type"],
                    allowNewValue: 0,
                    objectIEditor: ["BasicOptionInput"],
                    objectIViewer: ["BasicOptionView"],
                    allowUserDefinedValue: 1,
                    options: [
                        { label: "ClioPatria", value: "cliopatria" },
                        { label: "Virtuoso", value: "virtuoso" },
                        { label: "Stardog", value: "stardog" },
                        { label: "Blazegraph", value: "blazegraph" },
                        { label: "GraphDB", value: "graphdb" },
                        { label: "Sesame", value: "sesame" }
                    ]
                }
            },
            //for user page
            "http://virtuoso.local/users": {
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
                    isHidden: 1
                },
                "http://xmlns.com/foaf/0.1/accountName": {
                    label: ["Username"],
                    readOnlyProperty: 1
                },
                "http://xmlns.com/foaf/0.1/member": {
                    label: ["Member of"],
                    objectIEditor: ["BasicOptionInput"],
                    objectIViewer: ["BasicOptionView"],
                    options: [
                        {
                            label: "Normal User",
                            value:
                                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#NormalUser"
                        },
                        {
                            label: "Special User",
                            value:
                                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#SpecialUser"
                        }
                    ],
                    allowNewValue: 1
                },
                "http://xmlns.com/foaf/0.1/firstName": {
                    label: ["First Name"]
                },
                "http://xmlns.com/foaf/0.1/lastName": {
                    label: ["Last Name"]
                },
                "http://purl.org/dc/terms/created": {
                    label: ["Created at"],
                    readOnlyProperty: 1
                },
                "http://xmlns.com/foaf/0.1/mbox": {
                    label: ["Email Address"],
                    readOnlyProperty: 1
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#editorOf": {
                    label: ["Editor of Scope"],
                    allowNewValue: 1,
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope",
                                instances: [
                                    { value: "D", valueType: "literal" }
                                ]
                            },
                            config: {
                                hint: [
                                    "Scope of access: e.g. D, DP, R, RP, P , etc."
                                ],
                                label: ["Scope"],
                                objectIEditor: ["BasicOptionInput"],
                                objectIViewer: ["BasicOptionView"],
                                options: [
                                    { label: "Dataset", value: "D" },
                                    { label: "Resource", value: "R" },
                                    { label: "Property", value: "P" },
                                    { label: "Dataset-Resource", value: "DR" },
                                    { label: "Dataset-Property", value: "DP" },
                                    { label: "Resource-Property", value: "RP" },
                                    {
                                        label: "Dataset-Resource-Property",
                                        value: "DRP"
                                    }
                                ]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset",
                                instances: [
                                    {
                                        value: "http://exampleDataset.org",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                hint: [
                                    "Dataset URI under which the property is exposed."
                                ],
                                label: ["Dataset"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource",
                                instances: [
                                    {
                                        value: "http://exampleResource.org",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                hint: [
                                    "Resource URI under which the property is exposed."
                                ],
                                label: ["Resource"],
                                objectIEditor: ["PrefixBasedInput"],
                                objectIViewer: ["PrefixBasedView"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property",
                                instances: [
                                    {
                                        value: "http://exampleProperty.org",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                hint: ["Property URI"],
                                label: ["Property"],
                                objectIEditor: ["PrefixBasedInput"],
                                objectIViewer: ["PrefixBasedView"]
                            }
                        }
                    ]
                },
                "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#viewerOf": {
                    label: ["Viewer of Scope"],
                    allowNewValue: 1,
                    allowExtension: 1,
                    hasBlankNode: 1,
                    extensions: [
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#scope",
                                instances: [
                                    { value: "D", valueType: "literal" }
                                ]
                            },
                            config: {
                                hint: [
                                    "Scope of access: e.g. D, DP, R, RP, P , etc."
                                ],
                                label: ["Scope"],
                                objectIEditor: ["BasicOptionInput"],
                                objectIViewer: ["BasicOptionView"],
                                options: [
                                    { label: "Dataset", value: "D" },
                                    { label: "Resource", value: "R" },
                                    { label: "Property", value: "P" },
                                    { label: "Dataset-Resource", value: "DR" },
                                    { label: "Dataset-Property", value: "DP" },
                                    { label: "Resource-Property", value: "RP" },
                                    {
                                        label: "Dataset-Resource-Property",
                                        value: "DRP"
                                    }
                                ]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#dataset",
                                instances: [
                                    {
                                        value: "http://exampleDataset.org",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                hint: [
                                    "Dataset URI under which the property is exposed."
                                ],
                                label: ["Dataset"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#resource",
                                instances: [
                                    {
                                        value: "http://exampleResource.org",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                hint: [
                                    "Resource URI under which the property is exposed."
                                ],
                                label: ["Resource"],
                                objectIEditor: ["PrefixBasedInput"],
                                objectIViewer: ["PrefixBasedView"]
                            }
                        },
                        {
                            spec: {
                                propertyURI:
                                    "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#property",
                                instances: [
                                    {
                                        value: "http://exampleProperty.org",
                                        valueType: "uri"
                                    }
                                ]
                            },
                            config: {
                                hint: ["Property URI"],
                                label: ["Property"],
                                objectIEditor: ["PrefixBasedInput"],
                                objectIViewer: ["PrefixBasedView"]
                            }
                        }
                    ]
                },
                "http://xmlns.com/foaf/0.1/organization": {
                    label: ["Organization"],
                    allowNewValue: 1,
                    objectIViewer: ["BasicDBpediaView"],
                    objectIEditor: ["DBpediaInput"]
                }
            }
        },
        resource_property: {},
        //---------depth 3------------
        dataset_resource_property: {}
    }
};
