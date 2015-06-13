import Ember from 'ember';
import Auth from './auth';
/* global $ISIS */

var MeRoute = Auth.extend({

    beforeModel:function(){
        //if(this.controller) this.controller.init();
        if(!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    model:function(){
        var app = this.modelFor('application');
        return app;
    },

    setupController: function(controller, model) {
        controller.set('activePerson', model.get('activePerson'));
    },

    actions: {
        logout: function(){
            $ISIS.auth.logout();
            this.refresh();
        },

        updatePerson:function() {
            var activePerson = this.modelFor('application');
            activePerson.updatePerson.invoke({
                firstName:'Edgar',
                lastName:"Ravenhorst",
                dateOfBirth:'1991-02-20'
            }).then(function(result){
                console.log(result);
            });
        },
    },
});

export default MeRoute;
