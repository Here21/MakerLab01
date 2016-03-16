Meteor.publish('comments',function(postId){
	return Comments.find({
		postId:postId
	});
});

Meteor.publish('person', function(userId) {
	try {
		return Collections.Person.find({userID:userId})
	} catch (e){
		return e;
	}
});

function hasLoggedIn(userId) {
	return !!userId;
}

Collections.Person.allow({
	insert: hasLoggedIn
});


Meteor.publish('projects',function(){
	return Collections.Projects.find();
});

Meteor.publish('projectPost',function(id){
	return Collections.Projects.find({_id:id});
});

Meteor.publish('myPost',function(id){
	return Collections.Projects.find({authorId:id});
});


Collections.Projects.allow({
	insert: hasLoggedIn
});

Meteor.publish("findNumber",function(username){
	return Meteor.users.find({username:username})
});
