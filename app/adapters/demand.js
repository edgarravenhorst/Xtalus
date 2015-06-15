import DS from "ember-data";

var adapterSettings = {};

export default DS.RESTAdapter.extend({
    host: 'http://acc.xtalus.gedge.nl/simple/restful',
    namespace: 'objects/info.matchingservice.dom.DemandSupply.Demand',

    pathForType: function(type) {
        return null
    }
});
