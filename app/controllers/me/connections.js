import Ember from 'ember';
/* global $ */

var MeConnectionController = Ember.Controller.extend({

    actions: {
        showConnectionDetails: function(connection){
            this.set("selectedPerson", connection);
            $('section#page').addClass('aside-right');
            return false;
        },

        hideConnectionDetails: function(){
            $('section#page').removeClass('aside-right');
            return false;
        },
    },
});

export default MeConnectionController;
