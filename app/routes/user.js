import Ember from 'ember';

var UserRoute = Ember.Route.extend({

    beforeModel:function(){
        if(this.controller) this.controller.init();
        if (!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    activate: function() {

    }
});

export default UserRoute;
