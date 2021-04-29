import React from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { handleHistory, navigateAction } from 'fluxible-router';

/* Flux
_________*/

import PatternStore from '../../../stores/PatternStore';
import loadPatternInstances from '../../../actions/loadPatternInstances';
import cleanInstance from '../../../actions/cleanInstance';

import CustomLoader from '../../CustomLoader';
import NavbarHider from './NavbarHider';

import { forEach, filter } from 'lodash';

// import laodInstances action
// catch dataset id from route not from dataset store

const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

export default class PatternInstancesNetworkView extends React.Component {
    constructor(props) {
        super(props);
        this.navbarHider = new NavbarHider();
    }

    componentDidMount() {
        // If there are resources of a pattern instance loaded in the PatternInstancesStore we clean them
        // We expect a user click on an instance and explore new data
        // Navigation Scenario, Navigation Action:
        //      instances screen, filter and click on a instance visiting that instance
        //      instance screen, explore information of that single instance
        //      instance screen, go back button to instances screen
        //      instances screen, we found the previously loaded instances without query again
        //      instances screen we clean data of the previously visited instance
        //      instances screen, click on a new instance
        //      instance screen, new data for this instance are loaded
        this.context.executeAction(cleanInstance, {});

        // we get these URIs from url params in currentNavigate
        // we receive this in props from navigateHandler
        const datasetURI = this.props.RouteStore._currentNavigate.route.params
            .did;
        const patternURI = this.props.RouteStore._currentNavigate.route.params
            .pid;

        if (!this.props.PatternStore.instances) {
            if (datasetURI && patternURI) {
                context.executeAction(loadPatternInstances, {
                    dataset: datasetURI,
                    pattern: patternURI
                });
            }
        }
        // fetch schema again and compute color map

        // if (this.props.RouteStore._currentNavigate) {
        //     if (!this.props.RouteStore._currentNavigate.colorMap) {
        //         this.context.executeAction(loadPatterns, {
        //             dataset: datasetURI //missing
        //         });
        //     }
        // }
    }

    render() {
        return null;
    }

    // render() {
    //     let exploreResourceOnListItemClick;
    //     if (this.props.RouteStore._currentNavigate) {
    //         exploreResourceOnListItemClick = instanceUri => {
    //             console.log(
    //                 this.props.RouteStore._currentNavigate.route.params.did
    //             );
    //             console.log('Instance uri:');
    //             console.log(instanceUri);
    //             this.context.executeAction(navigateAction, {
    //                 url: `${PUBLIC_URL}/dataset/${encodeURIComponent(
    //                     this.props.RouteStore._currentNavigate.route.params.did
    //                 )}/resource/${encodeURIComponent(instanceUri)}`
    //             });
    //         };
    //     }

    //     if (this.props.PatternStore.instances) {
    //         const KnowledgeGraph = require('odp-reactor').KnowledgeGraph;
    //         const ResourceFactory = require('odp-reactor').ResourceFactory;
    //         const Measurement = require('odp-reactor').Measurement;
    //         const PatternInstancesPage = require('odp-reactor')
    //             .PatternInstancesPage;

    //         const instances = this.props.PatternStore.instances;

    //         const patternType = instances[0].type;

    //         const kg = new KnowledgeGraph();
    //         const resourceFactory = new ResourceFactory();

    //         const listHeadersSet = new Set();
    //         listHeadersSet.add('label');
    //         forEach(instances, instance => {
    //             // preprocessing raw data
    //             let resourceInstanceJson = {};

    //             if (instance.cPropLabel && instance.cProp) {
    //                 resourceInstanceJson['culturalProperty'] =
    //                     instance.cPropLabel;
    //                 resourceInstanceJson['culturalPropertyUri'] =
    //                     instance.cProp;
    //                 listHeadersSet.add('culturalProperty');
    //             }

    //             let startTime, endTime;
    //             if (instance.startTime && instance.endTime) {
    //                 startTime = instance.startTime.match(/\d+/g)
    //                     ? instance.startTime.match(/\d+/g)[0]
    //                     : null;
    //                 endTime = instance.endTime.match(/\d+/g)
    //                     ? instance.endTime.match(/\d+/g)[0]
    //                     : null;
    //                 listHeadersSet.add('startTime');
    //                 listHeadersSet.add('endTime');
    //                 listHeadersSet.add('locationType');
    //                 listHeadersSet.add('addressLabel');
    //                 listHeadersSet.add('lat');
    //                 listHeadersSet.add('long');
    //             }

    //             if (instance.measures) {
    //                 let measures = instance.measures.split(';');
    //                 measures.forEach(measure => {
    //                     let [rawm, v, u] = measure.split(' ');
    //                     let m = rawm.split('-').pop();

    //                     const lengthUnits = ['cm', 'm', 'mm'];
    //                     const defaultMeasurementUnit = 'm';

    //                     if (lengthUnits.includes(u) && v != 'MNR') {
    //                         v = v.replace(',', '.');
    //                         // do conversion

    //                         let a = false;
    //                         if (v.includes('350')) {
    //                             a = true;
    //                             console.log('DELETED', measure);
    //                         }

    //                         const measurement = Measurement.create({
    //                             unit: u,
    //                             value: v * 1
    //                         });
    //                         const newMeasurement = measurement.convert(
    //                             defaultMeasurementUnit
    //                         );
    //                         if (newMeasurement) {
    //                             v = newMeasurement.getValue();
    //                             u = newMeasurement.getUnit();
    //                         }

    //                         if (a) {
    //                             console.log(
    //                                 'deleted',
    //                                 measurement,
    //                                 newMeasurement
    //                             );
    //                         }
    //                     }

    //                     if (!isNaN(v)) {
    //                         resourceInstanceJson[m] = v;
    //                         resourceInstanceJson[`${m}MeasurementUnit`] = u;
    //                     }
    //                 });

    //                 resourceInstanceJson['measures'] = measures.length;

    //                 listHeadersSet.add('height');
    //                 listHeadersSet.add('width');
    //                 listHeadersSet.add('length');
    //                 listHeadersSet.add('diameter');
    //             }

    //             if (instance.parts) {
    //                 resourceInstanceJson['parts'] = instance.parts.split(';')
    //                     ? instance.parts.split(';').length
    //                     : undefined;
    //                 listHeadersSet.add('parts');
    //             }

    //             const instancePropertiesJson = Object.assign(
    //                 {
    //                     startTime: startTime || undefined,
    //                     endTime: endTime || undefined,
    //                     locationType: instance.locationType || undefined,
    //                     lat: toPrecision(instance.lat) || undefined,
    //                     long: toPrecision(instance.long) || undefined,
    //                     addressLabel: instance.addressLabel || undefined,
    //                     listProperties: {
    //                         listKeys: Array.from(listHeadersSet).map(
    //                             headerKey => {
    //                                 return listKeysIndex[headerKey];
    //                             }
    //                         ),
    //                         listItemClick: () => {
    //                             console.log('Clicked Instance');
    //                             console.log(instance);
    //                             exploreResourceOnListItemClick(
    //                                 instance.instance
    //                             );
    //                         },
    //                         listEntityClick: resourceURI => {
    //                             this.context.executeAction(navigateAction, {
    //                                 url: `${PUBLIC_URL}/dataset/${encodeURIComponent(
    //                                     this.props.RouteStore._currentNavigate
    //                                         .route.params.did
    //                                 )}/resource/${encodeURIComponent(
    //                                     resourceURI
    //                                 )}`
    //                             });
    //                         },
    //                         listTitle: instance.patternLabel
    //                     }
    //                 },
    //                 resourceInstanceJson
    //             );

    //             const instanceResource = resourceFactory.makeResource({
    //                 uri: instance.instance,
    //                 label: instance.label, // label: `${instance.label.substring(0, 50)}...`,
    //                 description: instance.description,
    //                 properties: instancePropertiesJson
    //             });

    //             kg.addResource(instanceResource);
    //         });

    //         let resetFilters = false;
    //         let noTutorial = false;
    //         if (this.props.RouteStore._currentNavigate) {
    //             resetFilters =
    //                 this.props.RouteStore._currentNavigate.route.query
    //                     .resetFilters || false;
    //             noTutorial = this.props.RouteStore._currentNavigate.route.query
    //                 .noTutorial;
    //         }

    //         console.log('RESOURCES:', kg.getResources().length);

    //         return (
    //             <PatternInstancesPage
    //                 knowledgeGraph={kg}
    //                 patternTypeUri={patternType}
    //                 resetFilters={resetFilters}
    //                 noTutorial={noTutorial}
    //             />
    //         );
    //     } else {
    //         const datasetContainerStyle = {
    //             height: '90vh',
    //             width: '90vw',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             margin: 'auto'
    //         };
    //         return (
    //             <div style={datasetContainerStyle}>
    //                 <CustomLoader></CustomLoader>
    //             </div>
    //         );
    //     }
    // }
}

PatternInstancesNetworkView.contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getUser: PropTypes.func
};
PatternInstancesNetworkView = connectToStores(
    PatternInstancesNetworkView,
    [PatternStore],
    function(context, props) {
        return {
            PatternStore: context.getStore(PatternStore).getState(),
            RouteStore: context.getStore('RouteStore')
        };
    }
);

// uri is used in the list like this instance[uri] so you need to save in the instance
// instance[uri] = https://example.com/instanceUri
//
// e.g. instance[cPropURI] = "someURIofTheCprop"
const listKeysIndex = {
    label: {
        label: 'View',
        id: 'label',
        uri: 'uri'
    },
    culturalProperty: {
        label: 'Cultural Property',
        id: 'culturalProperty',
        uri: 'culturalPropertyUri'
    },
    height: { label: 'Height', id: 'height' },
    width: { label: 'Width', id: 'width' },
    length: { label: 'Length', id: 'length' },
    diameter: { label: 'Diameter', id: 'diameter' },
    locationType: { label: 'Location Type', id: 'locationType' },
    startTime: { label: 'Start Time', id: 'startTime' },
    endTime: { label: 'End Time', id: 'endTime' },
    addressLabel: { label: 'Address', id: 'addressLabel' },
    lat: { label: 'Latitude', id: 'lat' },
    long: { label: 'Longitude', id: 'long' },
    parts: { label: 'Parts', id: 'parts' }
};

function toPrecision(n, p = 3) {
    if (n) return Number.parseFloat(n).toFixed(p);
    else return undefined;
}
