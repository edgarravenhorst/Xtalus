import Ember from 'ember';
/* global $ */

var MeConnectionController = Ember.Controller.extend({

    actions: {
        showConnectionDetails: function(connection){
            this.set("selectedPerson", connection);
            $('section#page.network').addClass('show-details');
            return false;
        },

        hideConnectionDetails: function(){
            $('section#page.network').removeClass('show-details');
            return false;
        },
    },

});

export default MeConnectionController;
