import Ember from 'ember';

var ProfileController = Ember.Controller.extend({

    title:'hallo daar',

    init: function() {
        this._super();
        console.log('controller called');
    }

});

export default ProfileController;
