import Ember from 'ember';
/* global $ISIS */

var LoginController = Ember.Controller.extend({

    actions: {
        login: function(){
          $ISIS.auth.login(this.get("username"), this.get("password"), function(){
              this.transitionToRoute('profile');
          }.bind(this));
        },
    }

});

export default LoginController;
