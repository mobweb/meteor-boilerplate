Examples = new Meteor.Collection('examples');

// We can use the allow and deny helpers if we just need to do some
// simple access checks. If we have to do more complex (access) checks
// we would use a Meteor.method (see below)
Examples.allow({
	// Runs the ownsDocument function defined in permissions.js to
	// check if the current document belongs to the current user
	update: ownsDocument,
	remove: ownsDocument
});

Examples.deny({
	// Every time Examples.update is called, BOTH the allow and deny
	// conditions/functions are checked/run. We can use this to
	// block the user from updating certain fields here
	update: function(userId, post, fieldNames) {
		// Check if the fieldNames object does not include the URL
		// and title fields. If it does, return true, so the update
		// will be denied
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

// A Meteor Method is a way of executing a series of commands on the
// server in a structured way. We are using a method here instead of
// directly calling the Examples.insert() function because we need to do
// some manual changes & checks to the post's data before it can be
// inserted
Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user();
		var postWithSameLink = Posts.findOne({url: postAttributes.url});

		if(!user) {
			throw new Meteor.Error(401, 'You need to be logged in to perform this action');
		}

		if(!postAttributes.title) {
			throw new Meteor.Error(422, 'Please enter a title');
		}

		if(postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);
		}

		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
				userId: user._id,
				author: user.username,
				submitted: new Date().getTime(),
				upvoters: [],
				votes: 0
			}
		);

		var postId = Posts.insert(post);

		return postId;
	},

	upvote: function(id) {

		Examples.update(
			// The condition:
			{
				// Select all posts with the specified ID that DONT
				// have the current user in the upvoter array. We do this
				// to stop the user form upvoting twice when clicking the
				// button twice really quickly...
				_id: id,
				upvoters: {
					$ne: user._id
				}
			},
			// And the update:
			{
				// Adds the ID to the array if it doesn't
				// already exist
				$addToSet: {
					upvoters: user._id
				},
				$inc: {
					votes: 1
				}
			}
		);
	}
});