import Ember from 'ember';
/* global $ */
/* global $ISIS */

var ProjectMatchingController = Ember.Controller.extend({

    actions: {

        saveWidget:function(element, params){
            console.log(this.get('selectedProfile'), params)
            var profile = this.get('selectedProfile');

            $ISIS.get('http://acc.xtalus.gedge.nl/simple/restful/'+profile.get('URI')).then(function(isisProfile){
                isisProfile = $ISIS.extractMembers(isisProfile);
                console.log(isisProfile, element.action);
                isisProfile[element.action].invoke(params).then(function(result){
                    console.log(result);
                })
            })
        },

        selectMatchingProfile: function(id){
            var profile = this.store.find('demandprofile', id).then(function(profile){
                //this.send('calculateMatches', profile)
                this.set('selectedProfile', profile)
            }.bind(this))

        },

        calculateMatches: function(profile){
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
                        return matches
                    })
                });
            });


        }
    }


});

export default ProjectMatchingController;
