import Ember from 'ember';
/* global $ISIS */

var ApplicationRoute = Ember.Route.extend({

    beforeModel:function(){
        if(!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    model: function(){
        if($ISIS.getCookie('auth')) {
            return $ISIS.init().then(function(isis){
                console.log(isis);
                return isis.activePerson.invoke().then(function(activePerson){
                    var picture = '';
                    if (activePerson.picture) picture = activePerson.picture.split(':');
                    var fullname = activePerson.firstName + " " + activePerson.lastName;
                    if (activePerson.middleName) {
                        fullname = activePerson.firstName + " " + activePerson.middleName + " " + activePerson.lastName;
                    }
                    activePerson.profilePicture = 'data:image/png;base64,'+picture[2];
                    activePerson.fullname = fullname;
                    return activePerson;
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
