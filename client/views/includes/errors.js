// Simply return all the errors in the client side collection
Template.errors.helpers({
	errors: function() {
		return Errors.find();
	}
});

// Every time an error is rendered, mark it as seen via
// the defer function, which delays execution by 1ms, to make
// sure the error is only marked as seen AFTER an optional
// redirect has happened
Template.error.rendered = function() {
	// this referes to the object currently being rendered
	var error = this.data;
	Meteor.defer(function() {
		Errors.update(error._id, {$set: {seen: true}});
	});
};