'use strict';

const es = require('elasticsearch');
const Document = require('./Document');

/**
 * Class Model
 * @params {Object} params
 * @params {String} params.modelName
 * @params {Object} params.mapping
 */
function Model(params){
    this.modelName = params.modelName;
    this.mapping = params.mapping;
}

Model.prototype = {
    createOne,
    list,
    save   // internal usage
};

/**
 * Build es index and create a model instance
 * @static
 */
Model.init = function *(modelName, mapping){
    const model = new Model({ modelName, mapping});
    yield model.save();

    // return instance
    return model;
};

module.exports = Model;


/**
 * Implements
 */

/**
 * Create and save a document
 */
function *createOne(params){
    const ret = yield Document.save(this, params);
    return ret;
}

/**
 * Save current model to db
 */
function *save(){
    const client = es.client;
    const modelName = this.modelName;
    const mapping = this.mapping;

    // create index
    if(!client.indices.exists({index: modelName})){
        yield client.indices.create({index: modelName});
    }

    // define mapping
    yield client.indices.putMapping({
        index: modelName,
        type: 'document',
        body: { properties: mapping }
    });
    
    // return instance
    return this;
};

/**
 * List current model from db
 */
// TODO: params as query parameters
function *list(params){
    const client = es.client;
    const modelName = this.modelName;
    console.info(`[INFO] (elasticsearch-extend) ${__filename}: list(): modelName: ${modelName}`);

    const ret = yield client.search({
        index: modelName,
        type: 'document',
        body: {
            query: {
                match: {
                }
            }
        }
    });

    // convert hits to documents
    
    return ret;
};

