import Ember from 'ember';
/* global $ */

var ProjectMatchingController = Ember.Controller.extend({

    actions: {

        saveWidget:function(element, params){
            console.log(this.get('profile'), params)
            var profile = this.get('profile');
            profile[element.action].invoke(params).then(function(result){
                console.log(result);
            })
        },

        selectMatchingProfile: function(profile){
            var self = this;
            if (profile) this.set('profile', profile);
            console.log('Matchingprofile', profile);

            this.model.initMatchingProfile(profile).then(function(profile){
                console.log(profile)
                self.set('selectedProfile', profile)
            });
        },

    }

});

export default ProjectMatchingController;
