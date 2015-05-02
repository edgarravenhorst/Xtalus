import Ember from 'ember';
/* global $ */

var ProjectIndexRoute = Ember.Route.extend({
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
        var matchingProfiles = [];

        $.each(model.matchingProfiles, function(i, profile){
            matchingProfiles.push({
                name: profile.profileName
            })
        })

        console.log(matchingProfiles);

        controller.setProperties({
            title: "Schilder project",
            owner: project.demandOwner.title,
            description: project.demandDescription,
            matchingProfiles: matchingProfiles,
            startdate: project.demandOrSupplyProfileStartDate,
            enddate: project.demandOrSupplyProfileEndDate,
            summary: project.demandSummary,
            story: project.demandStory,
        });



    },
});

export default ProjectIndexRoute;
