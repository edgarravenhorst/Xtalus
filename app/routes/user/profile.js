import Ember from 'ember';
import UserRoute from '../user';

var ProfileRoute = UserRoute.extend({
    init: function() {
        this._super();
        if (!$ISIS.getCookie('auth')) {
            this.transitionTo('login');
        }
    }
});

export default ProfileRoute;
