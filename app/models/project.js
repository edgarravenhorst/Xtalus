import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr({defaultValue:'title'}),
    description: DS.attr(),
    owner: DS.attr(),
    summary: DS.attr(),
    story: DS.attr(),
    matchingProfiles: DS.attr(),

    init:function(){
        this._super();
        var _this = this;
        var params = {uUID: this.get('id')}

        return $ISIS.store.findDemandByUniqueId.invoke(params).then(function(project){

            var a_promises = {
                owner: $ISIS.get(project.demandOwner.href),
                matchingProfiles: project.collectDemandProfiles.extract(),
            };

            return Ember.RSVP.hash(a_promises).then(function(result){

                _this.setProperties({
                    owner: result.owner,
                    matchingProfiles: result.matchingProfiles,
                    ownerName: project.demandOwner.title,
                    description: project.demandDescription,
                    startdate: project.demandOrSupplyProfileStartDate,
                    enddate: project.demandOrSupplyProfileEndDate,
                    summary: project.demandSummary,
                    story: project.demandStory,
                });

                console.log(result);
                return _this;
            });
        });
    },

    initMatchingProfile: function(profileData){
        console.log(profileData)
        var collectMatches = profileData.collectSupplyProfileComparisons.extract().then(function(matches){
            var a_promises = [];
            console.log('matches', matches);
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
                //console.log(matches)
                return matches
            })
        });


        var a_promises = {
            matches: collectMatches,
            //matchingElements: profileData.collectProfileElementChoices.extract(),
            //choosenMatchingElements: profileData.collectProfileElements.extract()
        };

        return Ember.RSVP.hash(a_promises)

    }
});
