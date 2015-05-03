'use strict';
import {sparqlEndpoint} from '../configs/general';
import {defaultGraphName, resourceFocusType} from '../configs/reactor';
import queries from './sparql/dataset_queries';
import utils from './utils/dataset_utils';
import rp from 'request-promise';
/*-------------config-------------*/
const httpOptions = {
  host: sparqlEndpoint[0].host,
  port: sparqlEndpoint[0].port,
  path: sparqlEndpoint[0].path
};
const outputFormat = 'application/sparql-results+json';
/*-----------------------------------*/
let rpPath, graphName, query;
export default {
    name: 'dataset',
    // At least one of the CRUD methods is Required
    read: (req, resource, params, config, callback) => {
        if (resource === 'dataset.resourcesByType') {
            //SPARQL QUERY
            graphName = (params.id==='default'? defaultGraphName: params.id);
            query = queries.getPrefixes() + queries.getResourcesByType(graphName, resourceFocusType);
            //build http uri
            rpPath = httpOptions.path+'?query='+ encodeURIComponent(query)+ '&format='+encodeURIComponent(outputFormat);
            //send request
            rp.get({uri: 'http://'+httpOptions.host+':'+httpOptions.port+ rpPath}).then(function(res){
                callback(null, {
                    graphName: graphName,
                    resources: utils.parseResourcesByType(res)
                });
            }).catch(function (err) {
                console.log(err);
                callback(null, {graphName: graphName, resources: []});
            });
        }

    }
    // other methods
    // create: function(req, resource, params, body, config, callback) {},
    // update: function(req, resource, params, body, config, callback) {},
    // delete: function(req, resource, params, config, callback) {}
};
