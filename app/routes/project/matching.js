import Ember from 'ember';
/* global $ */

var ProjectMatchingRoute = Ember.Route.extend({
    model: function() {
        var project = this.modelFor('project');
        var profile = project.get('profiles');
        //console.log(profile[0]);
        return this.store.find('demandprofile', profile[0].id).then(function(profile){
            project.set('selectedProfile', profile);
            console.log(profile);
            var widgets = profile.get('profileElements')

            $.each(widgets, function(i, widget){
                if(widget){
                $ISIS.init('http://acc.xtalus.gedge.nl/simple/restful/' + widget.URI).then(function(isisWidget){
                    //console.log(widget);
                    Ember.set(widget, 'weight', isisWidget.weight);
                    profile.set('profileElements', Ember.ArrayController.create({
                        model:widgets,
                        sortProperties: ['weight'],
                        sortAscending: true
                    }))
                });
                }
            })

            return project
        })
    },

    setupController:function(controller, model){
        controller.set('model', model);
        controller.set('selectedProfile', model.get('selectedProfile'));
    }
});

export default ProjectMatchingRoute;
