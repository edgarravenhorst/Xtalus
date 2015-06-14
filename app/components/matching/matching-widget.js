export default Ember.Component.extend({
    tagName:'section',
    classNames: 'matching-widget',
    currentValue: '',
	placeholder:'test',

    actions: {
        previousValue: function(e) {
            this.set('currentValue', 'previous')
        },

        nextValue: function(e) {
            this.set('currentValue', 'next')
        },
    }
});
