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
                return isis.activePerson.invoke().then(function(activePerson){
                    var picture = activePerson.picture.split(':');
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
    }

});

export default ApplicationRoute;
