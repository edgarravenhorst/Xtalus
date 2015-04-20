import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver: Resolver,
    actions: {
        collapseAside: function(){
            alert('click')
        },
    }
});

$ISIS.settings = {
    baseurl: "http://xtalus.apps.gedge.nl/simple/restful/services/info.matchingservice.dom.Api.api/",
    method: 'GET',
};

$ISIS.init(function(data){
    data.activePerson.invoke({}, function(person){
        $ISIS.user = person;
    });
});

loadInitializers(App, config.modulePrefix);

export default App;
