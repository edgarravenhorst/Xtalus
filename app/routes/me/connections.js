import Ember from 'ember';
/* global $ */
/* global $ISIS */

var MeConnectionsRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('me').get('activePerson');
    },
});

export default MeConnectionsRoute;
