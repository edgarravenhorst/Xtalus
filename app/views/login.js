import Ember from 'ember';

var LoginView = Ember.View.extend({
    layoutName: 'layout/login',
    templateName: 'profile',
    bodyclass: 'classname',
    init: function() {
        this._super();
        console.log(this.layoutName, this.templateName, this);
    }
});

export default LoginView;

