import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var NetworkController = Ember.Controller.extend({

    actions: {
        showConnectionDetails: function(connection){
            this.set("selectedPerson", connection)
            $('section#page.network').addClass('show-details');
            return false;
        },

        hideConnectionDetails: function(e){
            $('section#page.network').removeClass('show-details');
            return false;
        },

        getUserProfile: function(userID){
            this.transitionToRoute('profile.get:id', userID);
        },
    },

});

export default NetworkController;
