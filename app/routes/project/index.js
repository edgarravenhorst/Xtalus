import Ember from 'ember';
/* global $ */

var ProjectIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('project');
    },
});

export default ProjectIndexRoute;
