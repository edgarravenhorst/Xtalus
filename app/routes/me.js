import Ember from 'ember';
/* global $ISIS */

var MeRoute = Ember.Route.extend({

    beforeModel:function(){
        //if(this.controller) this.controller.init();
        if(!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    model:function(){
        return this.modelFor('application');
    },

    setupController: function(controller, model){
        controller.set('activePerson', model);
    },

    actions: {
        logout: function(){
            $ISIS.auth.logout();
            this.refresh();
        },

        updatePerson:function() {
            var activePerson = this.controller.get('activePerson');
            activePerson.updatePerson.invoke({
                firstName:'Edgar',
                lastName:"Ravenhorst",
                dateOfBirth:'1991/02/20'
            }).then(function(result){
                console.log(result);
            });
        },
    }
});

export default MeRoute;
