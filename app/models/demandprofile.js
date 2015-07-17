import DS from 'ember-data';

export default DS.Model.extend({
    URI: DS.attr(),
    description: DS.attr(),
    profileElements: DS.attr(),
    profileElementChoices: DS.attr(),
    profileMatches: DS.attr(),
    matches: DS.attr(),
    chosenProfileMatchId:DS.attr({defaultValue:""}),
    chosenProfileMatchURI:DS.attr({defaultValue:""}),

    isisObj:function(){
        return $ISIS.get('http://acc.xtalus.gedge.nl/simple/restful/'+this.get('URI')).then(function(isisObjData){

            return ($ISIS.extractMembers(isisObjData));

        });
    }.property('URI')
});
