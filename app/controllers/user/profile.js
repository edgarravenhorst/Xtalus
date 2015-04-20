import Ember from 'ember';
/* global $ISIS */

var ProfileController = Ember.Controller.extend({

    title:'hallo daar',

    init: function() {
        this._super();

        $ISIS.init(function(data){
            console.log(data);
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
