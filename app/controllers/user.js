import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({

    init: function() {
        this._super();
        this.set('fullname', '');
        this.set('profilePicture', '');

        var self = this;


        this.initPerson().then(function(){
            console.log('been here');
            self.set('profilePicture','data:image/png;base64,'+picture[2]);
            self.set('fullname',person.firstName + " " + person.lastName);
            self.set('person', person);
        });
    },

    initPerson: function(){
        var self = this;
        return new Promise(function(resolve, reject){
            if (!self.person) {
                $ISIS.init(function(data){
                    data.activePerson.invoke({}, function(person){
                        var picture = person.picture.split(':');

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
