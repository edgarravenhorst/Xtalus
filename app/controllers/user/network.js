import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var NetworkController = UserController.extend({

    title:'',

    init: function() {
        var self = this;
        this._super();

        this.set('title', '');

        this.initPerson().then(function(person){
            person.collectPersonalContacts
                .extract(function(rawdata){
                var connections = [];

                $.each(rawdata, function(i, connectiondata){
                    var connection = {};
                    connection.username = connectiondata.contactPerson.title
                    connections.push(connection);
                });

                self.setProperties({
                    connections: connections,
                    connectionCount: connections.length,
                });
            });
        });
    },

    actions: {
        showConnectionDetails: function(e){
            $('section#page.network').addClass('show-details');
            return false;
        },
        hideConnectionDetails: function(e){
            $('section#page.network').removeClass('show-details');
            return false;
        },
    }

});

export default NetworkController;
