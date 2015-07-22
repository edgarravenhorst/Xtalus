import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
    tagName:'section',
    classNames: 'matching-widget sortable',
    currentValue: '',
    placeholder:'test',

    classNameBindings: ['collapsed'],
    collapsed: true,
    isNew:true,

    data: {},
    params: {},

    actions: {
        toggleStatus: function(e) {
            this.set('collapsed', !this.get('collapsed'))
        },

        previousValue: function(e) {
            this.set('currentValue', 'previous')
        },

        nextValue: function(e) {
            this.set('currentValue', 'next')
        },

        saveWidget:function() {
            var params = JSON.parse(JSON.stringify(this.get('params')))
            delete params._subControllers;

            params.weight = 10

            if(this.get('isTimePeriod')){
                params.startDate = this.data.startDate;
                params.endDate = this.data.endDate;
            }

            if(this.get('isRole')){
                $.each(this.get('role_chkbox.values'), function(i, obj){
                    params[obj.name] = obj.value;
                });
                console.log(params);
            }

            this.sendAction('action', this.get('data'), params);
            return false
        }
    },

    isPostal: function() {
        return this.get('data.description') === 'LOCATION_ELEMENT';
    }.property('data.description'),

    isRole: function() {
        if (this.get('data.description') === 'REQUIRED_ROLE_ELEMENT'){

            this.role_chkbox = {values:[]};
            this.data.roles = [{name:'student', value:true}, {name:'principal', value:true}, {name:'professional', value:true}]
            var params = {};
            $.each(this.data.roles, function(i, obj){
                params[obj.name] = false;
            });
            this.set('params', params)
            return true;
        }

        return false;
    }.property('data.description'),

    isPassion: function() {
        return this.get('data.description') === 'PASSION_TAGS_ELEMENT';
    }.property('data.description'),

    isBranch: function() {
        return this.get('data.description') === 'BRANCHE_TAGS_ELEMENT';
    }.property('data.description'),

    isQuality: function() {
        return this.get('data.description') === 'QUALITY_TAGS_ELEMENT';
    }.property('data.description'),

    isWeekdays: function() {
        return this.get('data.description') === 'WEEKDAY_TAGS_ELEMENT';
    }.property('data.description'),

    isHourlyRate: function() {
        return this.get('data.description') === 'HOURLY_RATE_ELEMENT';
    }.property('data.description'),

    isAge: function() {
        return this.get('data.description') === 'AGE_ELEMENT';
    }.property('data.widgetType'),

    isTimePeriod: function() {
        return (this.get('data.description') === 'TIME_PERIOD_ELEMENT');
    }.property('data.description'),

    isEducation: function() {
        return this.get('data.description') === 'EDUCATION_LEVEL';
    }.property('data.description'),


});
