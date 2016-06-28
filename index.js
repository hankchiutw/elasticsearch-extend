'use strict'

const co = require('co');
const es = require('elasticsearch');

const Client = require('./lib/Client');
const Model = require('./lib/Model');

/**
 * Extend origin es object
 */
Object.assign(es, {
    isConnected: false,
    connect,
    model,
    _models: {}
});

module.exports = es;

/**
 * Implements
 */

/**
 * Connect and return a promise of ping result
 * @params {Object} params Same as params of origin elasticsearch.Client()
 * @return {Promise}
 */
function connect(params){
    es.client = new Client(params);

    return es.client.ping().then(function(result){
        es.isConnected = true;
        return Promise.resolve(result);
    });
};


/**
 * Register/Get an index as a model instance
 * @params {String} modelName
 * @params {Object} mapping If not set, try to return registered model
 */
function model(modelName, mapping){
    if(!es.isConnected) throw new Error('(elasticsearch-extend) not connected.');
    if(mapping === undefined){
        if(!es._models[modelName]) throw new Error(`(elasticsearch-extend) model ${modelName} not registered.`);
        return es._models[modelName];
    }
    else if(es._models[modelName]) throw new Error(`(elasticsearch-extend) model ${modelName} already registered.`);

    // delayed save to db
    const model = new Model({ modelName, mapping});
    co(model.save()).catch(console.error);

    es._models[modelaName] = model;

    // return instance
    return model;
};

