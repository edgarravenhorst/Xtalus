import Ember from 'ember';
/* global $ISIS */

var ProfileRoute = Ember.Route.extend({

    model: function(params) {
        var personModel = this.store.createRecord('person')
        if(params.user_id){
            return $ISIS.init().then(function(isis){
                return isis.findPersonByUniqueId.invoke({
                    uUID: params.user_id,
                });
            }).then(function(person){
                console.log(person);
                return personModel.initData(person);
            });
        }else{
            return params;
        }
    },


    setupController: function(controller, model) {
        controller.set('activePerson', this.modelFor('application'));
    }
});

export default ProfileRoute;
