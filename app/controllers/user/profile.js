import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var ProfileController = UserController.extend({

    title:'',

    init: function() {
        this._super();

        this.set('title', '');
        this.initPerson().then(this.setUserData.bind(this));
    },

    setUserData: function(person){
        this.setProperties({
            title: person.firstName + ' ' + person.lastName + ','
        });
    }
});

export default ProfileController;
