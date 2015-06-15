import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
    tagName:'section',
    classNames: 'matching-widget',
    currentValue: '',
    placeholder:'test',

    classNameBindings: ['collapsed'],
    collapsed: true,
    isNew:true,

    data: {},
    params: {postcode:'1010AV'},

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
            params.weight = 10
            delete params._subControllers;

            this.sendAction('action', this.get('data'), params);
            return false
        }
    },

    isTextfield: function() {
        return this.get('data.widgetType') === 'TEXT';
    }.property('data.widgetType'),

    isNumber: function() {
        return this.get('data.widgetType') === 'NUMBER';
    }.property('data.widgetType'),

    isSelect: function() {
        return this.get('data.widgetType') === 'SELECT';
    }.property('data.widgetType'),

    isTags: function() {
        return this.get('data.widgetType') === 'TAGS';
    }.property('data.widgetType'),

    isDate: function() {
        return this.get('data.widgetType') === 'DATE';
    }.property('data.widgetType'),

});
