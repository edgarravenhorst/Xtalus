import Ember from 'ember';
/* global $ */

var ProjectIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('project');
    },

    actions: {

        delProject: function(){
            var self = this;
            var ISISdemand = this.get('model.isisObj');
            var confirmed = confirm("Weet je het zeker?");

            if(confirmed) {
                ISISdemand.then(function(demandObj){
                    demandObj.deleteDemand.invoke({confirmDelete: confirmed}).then(function(){

                        self.transitionTo('me.projects');
                        self.model.reload();
                    });
                })
            }
        },
    },
});

export default ProjectIndexRoute;
