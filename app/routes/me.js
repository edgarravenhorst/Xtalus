import Ember from 'ember';

var MeRoute = Ember.Route.extend({

    beforeModel:function(params, transition){
        //if(this.controller) this.controller.init();
        if(!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    model:function(){
        return this.modelFor('application');
    },

    setupController: function(controller, model){
        controller.set('activePerson', model)
    },

    actions: {
        logout: function(){
            $ISIS.auth.logout();
            this.refresh();
        },
    }
});

export default MeRoute;
