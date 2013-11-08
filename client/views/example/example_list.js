/*
 *
 * This file is a "manager" for the template. Here we can define
 * functions/helpers, listen for events and so on
 *
 */
Template.exampleList.helpers({
	list: function() {
		return Examples.find(this.filter, this.options);
	}
});

Template.exampleList.events({
	'click .load-more': function(e) {
		e.preventDefault();
		// Use this function provided by the "paginated-subscription" package
		// to advance to the next page
		this.handle.loadNextPage();
	}
});

// Here we are specifying the data which is passed into the template
// when extending the basic example list template. At the top of this file,
// the data is used to determine the current sort order
Template.topExamplesList.helpers({
	arguments: function() {
		return {
			filter: {},
			options: {
				sort: {someAttribute: -1, anotherAttribute: -1},
				handle: topExamplesHandle
			}
		};
	}
});