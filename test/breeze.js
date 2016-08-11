// var xhr = require("xhr");

(function(global){
    if (typeof window === "undefined") {
        window = this;
        window.require = require;
        window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        window.DOMParser = require('xmldom').DOMParser;
    }
})(global);

var breeze = require('breeze-build');

//console.log(breeze);
var serviceUrl = "http://services.odata.org/V2/OData/OData.svc/"; //'http://services.odata.org/OData/OData.svc/';

if (process.argv.length >= 3) {
    serviceUrl = process.argv[2];
}

breeze.config.initializeAdapterInstances({ dataService: "odata" });

var entityManager = new breeze.EntityManager(serviceUrl);

entityManager.fetchMetadata()
  .then(function() {
      var metadataStore = entityManager.metadataStore;
      // do something with the metadata
      console.log(metadataStore);

    var customerType = entityManager.metadataStore.getEntityType('Customer');

    console.log(customerType);

  }).fail(function(exception) {
    console.log("Unable to fetch metada, due to:");
    console.log(exception);
  });