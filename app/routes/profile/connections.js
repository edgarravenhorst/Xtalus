import Ember from 'ember';
/* global $ISIS */
/* global $ */

var ProfileConnectionsRoute = Ember.Route.extend({

    model: function() {
        var profile = this.modelFor('profile');
        return profile
    },
});

export default ProfileConnectionsRoute;
