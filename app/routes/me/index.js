import Ember from 'ember';
/* global $ */

var MeIndexRoute = Ember.Route.extend({
    model:function(){
        console.log(this.modelFor('me'))
        return this.modelFor('me');
    },

    actions: {

    }
});

export default MeIndexRoute;
