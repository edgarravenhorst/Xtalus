import Ember from 'ember';

var ProfileRoute = Ember.Route.extend({
    init: function() {
        this._super();
        if (!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    }
});

export default ProfileRoute;
