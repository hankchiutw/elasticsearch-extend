# elasticsearch-extend
[![npm version](https://badge.fury.io/js/elasticsearch-extend.svg)](https://badge.fury.io/js/elasticsearch-extend)

Extended official [elasticsearch](https://www.npmjs.com/package/elasticsearch) module with ODM functions

### Features
- Compatible with official [elasticsearch](https://www.npmjs.com/package/elasticsearch)
- ES6 syntax(generator, class, etc).

### How to use

Init es connection:
```js
const es = require('elasticsearch-extend');

es.connect({
    host: 'localhost:9200',
    log: 'info'
})
.then(function(){ ... })
.catch(function(error){ ... });
```

Once connected, register a model:
```js
const UserModel = es.model('user', {
    username: { type: "string"},
    phone: { type: "string"}
});
```

Get a registered model:
```js
const UserModel = es.model('user');
```

### APIs

##### es.connect(params)
> Connect to an elasticsearch server

##### es.isConnected
> Indicate whether elasticsearch connected or not

##### es.model(modelName, mapping)
> Register a model

##### es.model(modelName)
> Get a model

#### Model APIs
##### model.createOne(params)
> Create one document

##### model.list(params)
> List documents


### ToDos
- More model APIs
- Document APIs
