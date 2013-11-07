/* ============================================================================
 *
 * Notes / Examples
 *
 ===========================================================================

/* ============================================================================
 *
 * Custom code
 *
 =========================================================================== */

// Create a new collection without a name, so the collection will
// be client only
Errors = new Meteor.Collection(null);

// Creating a new error
throwError = function(message) {
	Errors.insert({message: message, seen: false});
};

// Wiping out all the viewed errors
clearErrors = function() {
	Errors.remove({seen: true});
};