Comments = new Mongo.Collection('comments');

Meteor.methods({
	// console.log(`here  here  here`)
	'/comments/add': function(name,email,website,message,postId){
		var comment = {
			postId:postId,
			commenter:name,
			email:email,
			content:message,
			createdAt:new Date()
		};
		// console.log(`here  here  here`)
		Comments.insert(comment);
	}
});

