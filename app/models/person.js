import DS from 'ember-data';

export default DS.Model.extend({

    fullName: function(e) {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    profilePicture: function() {
        var picture = this.get('rawPicture') || '';
        picture = picture.split(':');
        return 'data:image/png;base64,'+picture[2];
    }.property('rawPicture'),

    initData:function(personData){
        var _this = this;
        this.set('personData', personData)

        var a_promises = Array(
            this.initConnections(),
            this.initProjects(),
            this.fetchProfileData()
        )

        return Ember.RSVP.all(a_promises).then(function(result){
            var connections = result[0];
            var projects = result[1];
            var supplies = result[2];

            _this.setProperties({
                firstName: personData.firstName,
                lastName: personData.lastName,
                birthDate: personData.lastName,
                rawPicture: personData.picture,
                birthdate: personData.dateOfBirth,
                roles: personData.roles,
                projects:projects,
                connections:connections,
            });

            $.each(supplies, function(i, supply){

                if (supply.profileElementDescription === "PASSION_ELEMENT"){
                    _this.set('passion', supply.textValue);
                }

                if (supply.profileElementDescription === 'QUALITY_TAGS_ELEMENT'){
                    supply.collectTagHolders.extract().then(function(result){
                        var qualities = [];
                        $.each(result, function(i, tagholder){
                            qualities.push(tagholder.tag.title);
                        });
                        _this.set('qualities', qualities);
                    });
                }
            });

            return _this;
        });
    },

    initProjects:function (){
        var personData = this.get('personData');
        return personData.collectDemands.extract();
    },

    initConnections:function (){
        var personData = this.get('personData');
        return personData.collectPersonalContacts.extract().then(function(rawdata){
            var connections = [];
            $.each(rawdata, function(i, connectiondata){
                if(connectiondata.contactPerson){
                    connectiondata.fullname = connectiondata.contactPerson.title;
                    connections.push(connectiondata);
                }
            });
            return connections;
        }).then(this.getConnectionDetails.bind(this));
    },

    getConnectionDetails: function(connections) {
        var connectiondata = connectiondata;
        var a_promises = [];
        var _this = this;

        $.each(connections, function(i, connectiondata){

            a_promises.push($ISIS.init(connectiondata.contactPerson.href).then(function(connection){
                connection.picture = connection.picture || '';
                var picture = connection.picture.split(':');
                connection.profilePicture = 'data:image/png;base64,'+picture[2];
                connection.fullname = connectiondata.fullname;
                return connection;
            }));

        });

        return Ember.RSVP.all(a_promises);
    },

    fetchProfileData:function() {
        var personData = this.get('personData');
        return personData.collectSupplies.extract().then(function(result){
            return result[0].collectSupplyProfiles.extract().then(function(result) {
                return result[0].collectProfileElements.extract();
            });
        });
    }
});
