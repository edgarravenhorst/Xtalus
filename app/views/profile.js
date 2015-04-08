import Ember from 'ember';

var ProfileView = Ember.View.extend({
    init: function() {
        this._super();
        console.log('view called');
    }

});

export default ProfileView;
