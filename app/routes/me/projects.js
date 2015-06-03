import Ember from 'ember';

var MeProjectsRoute = Ember.Route.extend({

    model: function() {
        var activePerson = this.modelFor('me');
        return activePerson.collectDemands.extract();
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
