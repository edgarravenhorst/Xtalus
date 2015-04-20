import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var ProfileController = UserController.extend({

    title:'hallo daar',

    init: function() {
        this._super();

        $ISIS.init(function(data){
            data.activePerson.invoke({}, this.setISISVars.bind(this));
        }.bind(this));
    },

    setISISVars: function(person){
        this.setProperties({
            title: person.firstName + ' ' + person.lastName + ','
        });
    }
});

export default ProfileController;
