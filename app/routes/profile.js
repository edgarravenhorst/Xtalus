import Ember from 'ember';

var ProfileRoute = Ember.Route.extend({
  init: function() {
    this._super();
    console.log('route called');
  }
});

export default ProfileRoute;
