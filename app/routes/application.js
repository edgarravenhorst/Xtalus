import Ember from 'ember';

var IndexRoute = Ember.Route.extend({

    beforeModel:function(params, transition){
        //if(this.controller) this.controller.init();
        if(!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    model: function(){
        return $ISIS.init().then(function(isis){
            return isis.activePerson.invoke().then(function(activePerson){
                var picture = activePerson.picture.split(':');
                var fullname = activePerson.firstName + " " + activePerson.lastName
                if (activePerson.middleName) fullname = activePerson.firstName + " " + activePerson.middleName + " " + activePerson.lastName
                activePerson.profilePicture = 'data:image/png;base64,'+picture[2];
                activePerson.fullname = fullname;
                return activePerson;
            });
        });
    }

});

export default IndexRoute;
