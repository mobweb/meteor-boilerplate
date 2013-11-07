/* ============================================================================
 *
 * Notes / Examples
 *
 ===========================================================================

Meteor.subscribe('publicationName', 10);

// Or to subscribe to a subscription that supports pagination:
subscriptionHandle = Meteor.subscribeWithPagination('publicationName', 10);

// We can use the autorun function to automatically update specific
// subscriptions once their "data source" changes:
Deps.autorun(function(){
	Meteor.subscribe('exampleEntitySingle', Session.get('currentEntityId'));
	Meteor.subscribe('entityComments', Session.get('currentEntityId'));
});

/* ============================================================================
 *
 * Custom code
 *
 =========================================================================== */
 