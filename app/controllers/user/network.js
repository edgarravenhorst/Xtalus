import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var NetworkController = UserController.extend({

    title:'',

    init: function() {
        this._super();

        this.set('title', '');

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

export default NetworkController;
