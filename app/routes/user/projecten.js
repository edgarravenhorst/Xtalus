import Ember from 'ember';
import UserRoute from '../user';

var ProjectenRoute = Ember.Route.extend({

    model: function(params, transition) {
        var activePerson = this.modelFor('user');
        return activePerson.collectDemands.extract();
    },

    setupController: function(controller, model) {
        controller.setProperties({
            activePerson: this.modelFor('user'),
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
