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

        selectMatchingProfile: function(id){

            var profile = this.store.find('profile', id).then(function(profile){
                this.send('getMatches', profile)
                this.set('selectedProfile', profile)
            }.bind(this))


        },

        getMatches: function(profile){
            return $ISIS.get('http://acc.xtalus.gedge.nl/simple/restful/'+profile.get('URI')).then(function(isisProfile){
                isisProfile = $ISIS.extractMembers(isisProfile)

                return isisProfile.collectSupplyProfileComparisons.extract().then(function(matches){
                    var a_promises = [];
                    $.each(matches, function(i, match){

                        if(match) {
                            a_promises.push($ISIS.init(match.proposedPerson.href));
                            console.log(match);
                        }
                    });

                    return Ember.RSVP.all(a_promises).then(function(matches){

                        $.each(matches, function(i, match){
                            //console.log(match)
                            var picture = match.picture ? match.picture.split(':') : '';
                            var fullname = match.firstName + " " + match.lastName;
                            if (match.middleName) {
                                fullname = match.firstName + " " + match.middleName + " " + match.lastName;
                            }
                            match.fullname = fullname;
                            match.profilePicture = 'data:image/png;base64,'+picture[2];
                        });

                        console.log(matches)
                        profile.set('matches', matches)
                        console.log(profile)
                        return matches
                    })
                });
            });


        }
    }


});

export default ProjectMatchingController;
