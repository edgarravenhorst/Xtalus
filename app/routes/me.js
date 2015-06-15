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
        return this.modelFor('application').get('activePerson');
    },

    actions: {
        updatePerson:function() {

            var activePerson = this.controller.get('activePerson');
            console.log(activePerson)
            activePerson.updatePerson.invoke({
                firstName:this.get('firstName'),
                lastName:this.get('lastName'),
                dateOfBirth:this.get('birthDate'),
            }).then(function(result){
                console.log(result);
            });
        },
    },
});

export default MeRoute;
