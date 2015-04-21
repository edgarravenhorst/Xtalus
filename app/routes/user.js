import Ember from 'ember';

var UserRoute = Ember.Route.extend({

    beforeModel:function(){
        if (!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    },

    activate: function() {
        if(this.controller) this.controller.init();
    }
});

export default UserRoute;
