import Ember from 'ember';
import Auth from './auth';
/* global $ISIS */

var ProjectRoute = Auth.extend({
    model: function(params) {
        var project = this.store.getById('project', params.project_id)
        if (!project) project = this.store.createRecord('project', {id:params.project_id}).init();
        return project
    },
});

export default ProjectRoute;
