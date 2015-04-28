import Ember from 'ember';
import UserController from '../user';
/* global $ISIS */

var NetworkController = UserController.extend({

    title:'',

    init: function() {
        this._super();
        var self = this;

        this.set('title', '');
        this.set('connections', '');

        this.getConnections();
    },

    getConnections: function(){
        var self = this;
        this.initPerson()
            .then(this.initConnections)
            .then(this.getConnectionDetails)
            .then(function(connections){
            self.setProperties({
                connections: connections,
                connectionCount: connections.length,
            })
        });
    },

    actions: {
        showConnectionDetails: function(connection){
            console.log(connection);

            this.set("selectedPerson", connection)


            $('section#page.network').addClass('show-details');
            return false;
        },
        hideConnectionDetails: function(e){
            $('section#page.network').removeClass('show-details');
            return false;
        },
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

    initConnections: function(person) {
        var self = this;
        return person.collectPersonalContacts.extract().then(function(rawdata){
            var connections = [];
            $.each(rawdata, function(i, connectiondata){
                connectiondata.fullname = connectiondata.contactPerson.title
                connections.push(connectiondata);
            });
            return connections;
        });
    },
});

export default NetworkController;
