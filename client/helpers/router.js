/* ============================================================================
 *
 * Notes / Examples
 *
 ===========================================================================

Meteor.Router.add({
	// Simply render a template at a specific path:
	'/some-path': 'myTemplate',

	// Handle along arguments and act upon them
	'/post/:_id': {
		to: 'myPostTemplate',
		// Do something with the ID
		and: function(id) {
			Session.set('currentPostId', id);
		}
	}
});

/* ============================================================================
 *
 * Custom code
 *
 =========================================================================== */

// Set up the router
Meteor.Router.add({
});

// Define and apply filters
Meteor.Router.filters({
	// Restrict access to certain pages to logged-in users
	'requireLogin': function(page) {
		if(Meteor.user()) {
			return page;
		} else {
			return 'accessDenied';
		}
	},

	// This filter is a bit of a hack since it doesn't really filter
	// anything. It only assures that the clearErrors function is
	// run everytime a new page is loaded
	'clearErrors': function(page) {
		clearErrors();
		return page;
	}
});

// Apply the login filter to certain pages
Meteor.Router.filter('requireLogin', {only: 'postSubmit'});

// Run this filter on every page load. It wipes out the previously
// viewed errors
Meteor.Router.filter('clearErrors');