import Ember from 'ember';

var ProjectenRoute = Ember.Route.extend({

    model: function(params, transition) {
        var activePerson = this.modelFor('profile');
        return activePerson.collectDemands.extract();
    },

    setupController: function(controller, model) {
        controller.setProperties({
            activePerson: this.modelFor('profile'),
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

export default ProjectenRoute;
