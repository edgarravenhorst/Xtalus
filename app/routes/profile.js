import Ember from 'ember';
/* global $ISIS */

var ProfileRoute = Ember.Route.extend({

    model: function(params) {
        if(params.user_id){
            return $ISIS.init().then(function(isis){
                return isis.findPersonByUniqueId.invoke({
                    uUID: params.user_id,
                });
            });
        }else{
            return params;
        }
    },

    setupController: function(controller, model) {
        console.log(model);
        controller.set('activePerson', this.modelFor('application'));
    }
});

export default ProfileRoute;
