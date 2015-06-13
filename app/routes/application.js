import Ember from 'ember';
import DS from 'ember-data';

/* global $ISIS */

var ApplicationRoute = Ember.Route.extend({

    model: function(){
        var store = this.store;
        if($ISIS.getCookie('auth')) {
            return $ISIS.init().then(function(isis){
                console.log("\nAPI referentie:\n",'--------------------------------------------------', isis, "===================================================\n");

                return isis.activePerson.invoke().then(function(personData){

                    var activePerson = store.createRecord('person');
                    return activePerson.initData(personData).then(function(person){
                        var isis = store.createRecord('isis')
                        isis.set('isis', isis);
                        isis.set('activePerson', person);
                        return isis;
                    })
                });
            });
        }else return store.createRecord('isis')
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
