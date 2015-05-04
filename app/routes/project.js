import Ember from 'ember';
/* global $ISIS */

var ProjectRoute = Ember.Route.extend({

    model: function(params) {
        if(params.project_id){
            return $ISIS.init().then(function(isis){
                return isis.findDemandByUniqueId.invoke({
                    uUID: params.project_id,
                }).then(function(project){
                    return $ISIS.init(project.demandOwner.href).then(function(person){
                        var picture = person.picture.split(':');
                        person.profilePicture = 'data:image/png;base64,'+picture[2],
                        project.owner = person;
                        return project
                    });
                });
            });
        }else{
            return params;
        }
    },

    setupController: function(controller, model) {
        controller.set('activePerson', this.modelFor('application'));
        controller.setProperties({
            projectTitle: "Schilder project",
            ownerProfilePicture: model.owner.profilePicture,
        })
    }
});

export default ProjectRoute;
