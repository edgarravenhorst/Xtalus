import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({

    initPerson: function(){
        var self = this;
        return $ISIS.init().then(function(isis){
            return isis.activePerson.invoke()
                .then(
                function(activeUser){
                    var picture = activeUser.picture.split(':');
                    var fullname = activeUser.firstName + " " + activeUser.lastName
                    if (activeUser.middleName) fullname = activeUser.firstName + " " + activeUser.middleName + " " + activeUser.lastName
                    activeUser.profilePicture = 'data:image/png;base64,'+picture[2];
                    activeUser.fullname = fullname;
                    self.set('activeUser', activeUser);
                    return activeUser;
                })
                .catch(function(error){console.log(error)});
        });
    },

    actions: {
        login: function(){
            $ISIS.auth.login(this.get("username"), this.get("password")).then(function(data){
                console.log(data);
                if (data.message) {
                    this.set('message', data.message);
                    return;
                }
                if (data.success){
                    this.initPerson();
                    this.transitionToRoute('user.projecten');
                }
            }.bind(this));
        },

        logout: function(){
            this.set('person', null);
            $ISIS.auth.logout();
            this.transitionToRoute('login');
        },
    }
});

export default UserController;
