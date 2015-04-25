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
                console.log(rawdata);
                $.each(rawdata, function(i, connectiondata){
                    var connection = connectiondata;
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
        showConnectionDetails: function(connection){
            console.log(connection);
            $ISIS.init(connection.contactPerson.href, function(person){

                person.fullname = person.firstName + " " + person.lastName
                if (person.middleName) person.fullname = person.firstName + " " + person.middleName + " " + person.lastName
                console.log(person);
                this.set("selectedPerson", person)

            }.bind(this))

            /*this.getProfileByID().then(function(profile){
                console.log(connection);
            })*/


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
