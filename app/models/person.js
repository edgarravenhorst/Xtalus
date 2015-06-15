import DS from 'ember-data';

export default DS.Model.extend({

    firstName: DS.attr(),
    middleName: DS.attr({defaultValue:''}),
    lastName: DS.attr(),
    dateOfBirth: DS.attr(),
    email: DS.attr(),

    demands: DS.attr({defaultValue:[]}),
    supplies: DS.attr({defaultValue:[]}),
    personalContacts: DS.attr({defaultValue:[]}),

    fullName: function(e) {
        var fullname = ''
        var firstname = this.get('firstName');
        var middlename = this.get('middleName');
        var lastname = this.get('lastName');
        if(firstname) fullname += firstname;
        if(middlename) fullname += ' ' + middlename;
        if(lastname) fullname += ' ' + lastname
        return fullname
    }.property('firstName', 'middleName', 'lastName'),

    profilePicture: function() {
        var picture = this.get('rawPicture') || false;
        if (!picture) return 'http://www.gravatar.com/avatar/' + md5(this.get('email'))
        picture = picture.split(':');
        return 'data:image/png;base64,'+picture[2];
    }.property('rawPicture', 'email'),

    connections:function(){
        var connections = this.get('personalContacts')
        var email = this.get('email')

        $.each(connections, function(i, connection){
            var picture = connection.picture || false;
            if (!picture) picture = 'http://www.gravatar.com/avatar/' + md5(email)
            else {
                picture = picture.split(':');
                picture = 'data:image/png;base64,'+picture[2];
            }


            connection.picture = picture;
            console.log(connection.picture)
        });

        return connections;
    }.property('personalContacts')
});
