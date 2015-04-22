import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({

    init: function() {
        this._super();
        this.set('title', '');
    },

    initPerson: function(){
        var self = this;
        return new Promise(function(resolve, reject){
            if (!self.person) {
                $ISIS.init(function(data){
                    data.activePerson.invoke({}, function(person){
                        self.set('person', person);
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
