import Ember from 'ember';
import DS from 'ember-data';

/* global $ISIS */

var ApplicationRoute = Ember.Route.extend({

    globalSearchQuery:"",

    model: function(){
        var store = this.store;
        if($ISIS.getCookie('auth')) {
            return $ISIS.init().then(function(isis){
                console.log("\nAPI referentie:\n",'--------------------------------------------------', isis, "===================================================\n");

                return $ISIS.get("http://acc.xtalus.gedge.nl/simple/restful/v1").then(function(restData){
                    console.log("\nPerson referentie:\n",'--------------------------------------------------', restData, "===================================================\n");


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
        getProject:function(id){
            this.transitionTo('project', id);
        },

        getProfile: function(id){
            this.transitionTo('profile', id);
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

        showPopup: function(name){
            Ember.$('section#page #' + name + '.popup').toggleClass('visible');
            Ember.$('section#page').toggleClass('popup-' + name);
            return false;
        },

        closePopup: function(name){
            Ember.$('section#page #' + name + '.popup').removeClass('visible');
            Ember.$('section#page').removeClass('popup-' + name);
            return false;
        },

        logout: function(){
            $ISIS.auth.logout();
            this.transitionTo('login');
        },

        createPersonalContact: function(id){
            var self = this;
            this.store.find('person', id).then(function(person){
                var ISISdemand = person.get('isisObj');
                ISISdemand.then(function(profileObj){
                    if (!profileObj.addAsPersonalContact) {
                        alert(profileObj.firstName + ' is al een connectie');
                        return
                    }
                    profileObj.addAsPersonalContact.invoke().then(function(){
                        self.controller.model.get('activePerson').content.reload()
                        alert(profileObj.firstName + ' is toegevoegd aan uw connecties');
                    });
                })
            })

        },

        deletePersonalContact: function(){

        },

    }
});

export default ApplicationRoute;
