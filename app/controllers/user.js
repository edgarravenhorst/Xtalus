import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({

    initPerson: function(){
        var self = this;
        return new Promise(function(resolve, reject){
            if (!self.person) {
                $ISIS.init(function(data){
                    data.activePerson.invoke({}, function(person){
                        var picture = person.picture.split(':');

                        var fullname = person.firstName + " " + person.lastName
                        if (person.middleName) fullname = person.firstName + " " + person.middleName + " " + person.lastName

                        self.set('profilePicture','data:image/png;base64,'+picture[2]);
                        self.set('fullname',fullname);
                        resolve(person)
                    });
                });
            }else{
                resolve(self.get('person'))
            }
        });
    },

    actions: {
        login: function(){
            $ISIS.auth.login(this.get("username"), this.get("password"), function(data){
                //console.log(data);
                if (data.message) {
                    this.set('message', data.message);
                    return;
                }
                if (data.success === false){
                    this.initPerson();
                    this.transitionToRoute('user.profile');
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
