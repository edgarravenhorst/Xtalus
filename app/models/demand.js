import DS from 'ember-data';

export default DS.Model.extend({
    URI: DS.attr(),
    description: DS.attr(),
	story: DS.attr(),
	startDate: DS.attr(),
	endDate: DS.attr(),
	summary: DS.attr(),
    profiles: DS.attr(),
    owner:DS.belongsTo('person'),

	isisObj:function(){
        return $ISIS.get('http://acc.xtalus.gedge.nl/simple/restful/'+this.get('URI')).then(function(isisObjData){

		console.log($ISIS.extractMembers(isisObjData));
            return ($ISIS.extractMembers(isisObjData));

        });
    }.property('URI')

});
