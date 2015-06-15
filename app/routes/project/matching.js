import Ember from 'ember';
/* global $ */

var ProjectMatchingRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('project');
    },
});

export default ProjectMatchingRoute;
