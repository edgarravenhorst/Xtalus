import Ember from 'ember';
/* global $ */

var MeIndexRoute = Ember.Route.extend({
    model:function(){
        console.log(this.modelFor('me').get('activePerson'))
        return this.modelFor('me').get('activePerson');
    },
});

export default MeIndexRoute;
