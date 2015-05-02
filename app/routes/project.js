import Ember from 'ember';
/* global $ISIS */

var ProjectRoute = Ember.Route.extend({

    model: function(params) {
        if(params.project_id){
            return $ISIS.init().then(function(isis){
                return isis.findDemandByUniqueId.invoke({
                    uUID: params.project_id,
                });
            });
        }else{
            return params;
        }
    },

    setupController: function(controller, model) {
        controller.set('activePerson', this.modelFor('application'));
    }
});

export default ProjectRoute;
