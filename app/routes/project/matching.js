import Ember from 'ember';
/* global $ */

var ProjectMatchingRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('project');
    },

    setupController: function(controller, model) {

        controller.set('model', model);
        controller.set('matchingProfiles', model.get('matchingProfiles'));
        model.initMatchingProfile(model.get('matchingProfiles')[0]).then(function(profile){
            console.log(profile)
            controller.set('selectedProfile', profile)
        });

    },
});

export default ProjectMatchingRoute;
