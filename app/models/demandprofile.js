import DS from 'ember-data';

export default DS.Model.extend({
    URI: DS.attr(),
    description: DS.attr(),
    profileElements: DS.attr(),
    profileElementChoices: DS.attr(),
    profileMatches: DS.attr(),
    profileComparisons: DS.attr(),
    chosenProfileMatchId:DS.attr({defaultValue:""}),
    chosenProfileMatchURI:DS.attr({defaultValue:""}),

    initMatch: function(){
        var _this = this;
        $ISIS.init('http://acc.xtalus.gedge.nl/simple/restful/' + this.get('chosenProfileMatchURI')).then(function(person){
                person.fullName = person.supplyCandidate.title;
                _this.initMatchInfo(person);
                _this.set('match', person);
            });
    }.observes('chosenProfileMatchURI'),

    candidates: function(){
        var _this = this;
        var profileMatches = this.get('profileMatches');

        var filteredMatches = Ember.ArrayController.create({
            model: [],
            sortProperties: ['calculatedMatchingValue'],
            sortAscending: false
        });

        $.each(profileMatches, function(i, match){
            $ISIS.init('http://acc.xtalus.gedge.nl/simple/restful/'+match.URI).then(function(match){
                match.contactName = match.supplyCandidate.title;
                _this.initMatchInfo(match);
                filteredMatches.pushObject(match);
            });
        });

        return filteredMatches;

    }.property('profileMatches'),

    isisObj:function(){
        return $ISIS.get('http://acc.xtalus.gedge.nl/simple/restful/'+this.get('URI')).then(function(isisObjData){

            return ($ISIS.extractMembers(isisObjData));

        });
    }.property('URI'),

    initMatchInfo: function(match){
        $ISIS.init(match.supplyCandidate.href).then(function(person){
            var picture = person.picture ? person.picture.split(':') : '';
            if(picture[2]) Ember.set(match, 'profilePicture', 'data:image/png;base64,'+picture[2]);
            Ember.set(match, 'roles', person.roles);
        });
    }


});
