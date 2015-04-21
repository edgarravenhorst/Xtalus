import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({

    init: function() {
        this._super();
    },

    actions: {
        login: function(){
            $ISIS.auth.login(this.get("username"), this.get("password"), function(data){
                if (data.message) {
                    this.set('message', data.message);
                    return;
                }
                if (data.success === false)
                    this.transitionToRoute('user.profile');
            }.bind(this));
        },

        logout: function(){
            $ISIS.auth.logout();
            this.transitionToRoute('login');
        },
    }
});
export default UserController;



