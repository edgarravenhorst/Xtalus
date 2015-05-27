import Ember from 'ember';
/* global $ */

var ProjectMatchingRoute = Ember.Route.extend({
    model: function() {
        var project = this.modelFor('project');
        var modelObj = {
            activePerson: this.modelFor('application'),
            project:project
        }

        return project.collectDemandProfiles.extract().then(function(matchingProfiles){
            modelObj.matchingProfiles = matchingProfiles
            return modelObj
        });
    },

    setupController: function(controller, model) {
        var activePerson = model.activePerson;
        var project = model.project;
        var matchingProfiles = {
            total: model.matchingProfiles.length,
            list:model.matchingProfiles
        };

        controller.setProperties({
            description: project.demandDescription,
            matchingProfiles: matchingProfiles,
            startdate: project.demandOrSupplyProfileStartDate,
            enddate: project.demandOrSupplyProfileEndDate,
            summary: project.demandSummary,
            story: project.demandStory,
        });
    },
});

export default ProjectMatchingRoute;
