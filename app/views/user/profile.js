import Ember from 'ember';

var ProfileView = Ember.View.extend({
    layoutName: 'layout/main',
    templateName: 'profile',
    init: function() {
        this._super();
        console.log(this.layoutName, this.templateName, this);
    }
});

export default ProfileView;

