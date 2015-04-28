import Ember from 'ember';
import UserRoute from '../user';

var NetworkRoute = Ember.Route.extend({
    model: function(params, transition) {
        var activePerson = this.modelFor('user');
        return this.initConnections(activePerson)
    },

    setupController: function(controller, connections) {
        controller.setProperties({
            connections: connections,
            connectionCount: connections.length,
        });
    },

    initConnections: function(person) {
        var self = this;
        return person.collectPersonalContacts.extract().then(function(rawdata){
            var connections = [];
            $.each(rawdata, function(i, connectiondata){
                connectiondata.fullname = connectiondata.contactPerson.title
                connections.push(connectiondata);
            });
            return connections;
        }).then(this.getConnectionDetails);
    },

    getConnectionDetails: function(connections) {
        var connectiondata = connectiondata;
        var a_promises = Array();
        $.each(connections, function(i, connectiondata){

            a_promises.push($ISIS.init(connectiondata.contactPerson.href).then(function(connection){
                var picture = connection.picture.split(':');
                connection.profilePicture = 'data:image/png;base64,'+picture[2];
                connection.fullname = connectiondata.fullname

                return connection
            }))

        });
        return Promise.all(a_promises);
    },
});

export default NetworkRoute;
