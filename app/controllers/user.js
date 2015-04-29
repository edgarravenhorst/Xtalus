import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({
    actions: {

        login: function(){
            console.log('login')
            $ISIS.auth.login(this.get("username"), this.get("password")).then(function(data){
                console.log(data);
                if (data.message) {
                    this.set('message', data.message);
                    return;
                }
                if (data.success){
                    this.transitionToRoute('user.projecten');
                }
            }.bind(this));
            return false;
        },
    }
});

export default UserController;
