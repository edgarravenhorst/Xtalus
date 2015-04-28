import Ember from 'ember';
/* global $ISIS */

var UserController = Ember.Controller.extend({

    initPerson: function(){
        var self = this;
        return $ISIS.init().then(function(isis){
            return isis.activePerson.invoke()
                .then(
                function(person){
                    var picture = person.picture.split(':');
                    var fullname = person.firstName + " " + person.lastName
                    if (person.middleName) fullname = person.firstName + " " + person.middleName + " " + person.lastName

                    self.set('profilePicture','data:image/png;base64,'+picture[2]);
                    self.set('fullname',fullname);
                    return person;
                })
                .catch(function(error){console.log(error)});
        });
    },

    getDemandByID:function(uniqueID){
        return $ISIS.init().then(function(isis){
            return isis.findDemandByUniqueId.invoke({
                uUID: uniqueID,
            });
        });
    },

    getProfileByID:function(uniqueID){
        return new Promise(function(resolve, reject){
            $ISIS.init(null, function(data){
                data.findPersonByUniqueId.invoke({
                    uUID: uniqueID,
                },function(result){
                    console.log('found it!');
                    resolve(result);
                });
            });
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
