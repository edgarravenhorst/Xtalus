import Ember from 'ember';
/* global $ */

var ProjectMatchingController = Ember.Controller.extend({

    actions: {

        selectMatchingProfile: function(profile){
            self = this;
            console.log(profile);

            profile.collectProfileMatches.extract().then(function(matches){
                var a_promises = [];
                $.each(matches, function(i, match){
                    a_promises.push($ISIS.init(match.proposedPerson.href));
                });
                Ember.RSVP.all(a_promises).then(function(matches){

                    $.each(matches, function(i, match){
                        var picture = match.picture.split(':');
                        var fullname = match.firstName + " " + match.lastName;
                        if (match.middleName) {
                            fullname = match.firstName + " " + match.middleName + " " + match.lastName;
                        }
                        match.fullname = fullname;
                        match.profilePicture = 'data:image/png;base64,'+picture[2];
                    });
                    console.log(matches)
                    profile.matches = matches;

                    self.set('selectedProfile', profile);
                })
            });
        },

    }

});

export default ProjectMatchingController;
