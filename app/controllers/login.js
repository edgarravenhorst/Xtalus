import Ember from 'ember';
/* global $ISIS */

var LoginController = Ember.Controller.extend({
    init: function() {
        this._super();
        if (!$ISIS.getCookie('auth')) {
            this.transitionToRoute('login');
        }
    },

    actions: {
        login: function(){
            $ISIS.auth.login(this.get("username"), this.get("password"), function(){
                this.transitionToRoute('user.profile');
            }.bind(this));
        },
    }
});
export default LoginController;
