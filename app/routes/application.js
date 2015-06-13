import Ember from 'ember';
/* global $ISIS */

var ApplicationRoute = Ember.Route.extend({

    beforeModel:function(){
        if(!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    model: function(){
        var store = this.store;
        if($ISIS.getCookie('auth')) {
            return $ISIS.init().then(function(isis){

                console.log("\nAPI referentie:\n",'--------------------------------------------------', isis, "===================================================\n");

                return isis.activePerson.invoke().then(function(activePerson){
                    var personModel = store.createRecord('person');
                    return personModel.initData(activePerson);
                });
            });
        }
    },

    actions: {
        getProject:function(projectIDs){
            this.transitionTo('project', projectIDs);
        },

        getProfile: function(userID){
            this.transitionTo('profile', userID);
        },

        changeView:function(viewID, slideID, type) {

            for(var i=0; i<10; i++){
                $("#" + viewID).removeClass('slide-'+i)
            }

            $("#" + viewID).addClass('slide-'+slideID)
            console.log('slide-'+slideID);
            return false;
        }
    }
});

export default ApplicationRoute;
