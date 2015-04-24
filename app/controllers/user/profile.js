import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var ProfileController = UserController.extend({

    title:'',

    init: function() {
        this._super();

        this.initPerson().then(this.setUserData.bind(this));
    },

    setUserData: function(person){
        console.log(person);
        this.setProperties({
            birthdate: person.dateOfBirth,
            roles: person.roles
        });
    }
});

export default ProfileController;
