import Ember from 'ember';

var UserRoute = Ember.Route.extend({
    init: function() {
        this._super();

    },

    beforeModel:function(){
        if (!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }else{
            this.transitionTo('user.profile');
        }
    },

    afterModel: function() {
        if(this.controller) this.controller.init();
    }
});

export default UserRoute;
