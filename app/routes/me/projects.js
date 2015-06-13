import Ember from 'ember';

var MeProjectsRoute = Ember.Route.extend({

    model: function() {
        //var activePerson = this.modelFor('me');
        return activePerson.collectDemands.extract();
    },

    model: function() {
        return this.modelFor('me').get('activePerson').initProjects();
    },

    setupController: function(controller, model) {
        controller.setProperties({
            activePerson: this.modelFor('me'),
            demands: model,
            projectCount: model.length,
        });
    },

    actions: {
        refreshDemands: function(){
            this.refresh();
        },
    }
});

export default MeProjectsRoute;
