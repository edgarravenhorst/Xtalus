import Ember from 'ember';
/* global $ISIS */
/* global $ */

var ProfileConnectionsRoute = Ember.Route.extend({

    model: function() {
        var profile = this.modelFor('profile');
        return this.initConnections(profile);
    },

    setupController: function(controller, connections) {
        controller.setProperties({
            connections: connections,
            connectionCount: connections.length,
        });
    },

    initConnections: function(person) {
        return person.collectPersonalContacts.extract().then(function(rawdata){
            var connections = [];
            console.log(rawdata);
            $.each(rawdata, function(i, connectiondata){
                if(connectiondata.contactPerson) {
                    connectiondata.fullname = connectiondata.contactPerson.title;
                    connections.push(connectiondata);
                }
            });
            return connections;
        }).then(this.getConnectionDetails);
    },

    getConnectionDetails: function(connections) {
        var connectiondata = connectiondata;
        var a_promises = [];
        $.each(connections, function(i, connectiondata){

            a_promises.push($ISIS.init(connectiondata.contactPerson.href).then(function(connection){
                var picture = "";
                if(connection.picture) picture = connection.picture.split(':');
                connection.profilePicture = 'data:image/png;base64,'+picture[2];
                connection.fullname = connectiondata.fullname;

                return connection;
            }));

        });
        return Ember.RSVP.all(a_promises);
    },
});

export default ProfileConnectionsRoute;