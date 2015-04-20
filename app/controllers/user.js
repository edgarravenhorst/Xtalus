import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({
    init: function() {
        this._super();
        if (!$ISIS.getCookie('auth')) {
            this.transitionToRoute('login');
        }
    },

    actions: {
        logout: function(){
            $ISIS.auth.logout();
            this.transitionToRoute('login');
        },
    }
});
export default UserController;



