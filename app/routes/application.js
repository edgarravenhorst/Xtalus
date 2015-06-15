import Ember from 'ember';
import DS from 'ember-data';

/* global $ISIS */

var ApplicationRoute = Ember.Route.extend({

    model: function(){
        var store = this.store;
        if($ISIS.getCookie('auth')) {
            return $ISIS.init().then(function(isis){
                console.log("\nAPI referentie:\n",'--------------------------------------------------', isis, "===================================================\n");

                return $ISIS.get("http://acc.xtalus.gedge.nl/simple/restful/v1").then(function(restData){
                    console.log(restData)

                    var person = store.find('person', restData.person.id);
                    var isis = store.createRecord('isis')
                    isis.set('isis', isis);
                    isis.set('activePerson', person);

                    return isis;
                });
            });
        }else {
            return store.createRecord('isis')
        }
    },


    actions: {

		findPerson:function(){
			console.log(this.get('globalSearchQuery'));
		},

        getProject:function(id){
            this.transitionTo('project', id);
        },

        getProfile: function(id){
            this.transitionTo('profile', id);
        },

        toggleAccountNav:function(){
            Ember.$('body').toggleClass('account-nav-visible');
            return false;
        },

        toggleUsernav:function(){
            Ember.$('body').toggleClass('user-nav-small');
            return false;
        },

        changeView:function(viewID, slideID, type) {

            for(var i=0; i<10; i++){
                $("#" + viewID).removeClass('slide-'+i)
            }

            $("#" + viewID).addClass('slide-'+slideID)
            console.log('slide-'+slideID);
            return false;
        },
    }
});

export default ApplicationRoute;
