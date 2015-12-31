Meteor.publish('comments',function(postId){
	return Comments.find({
		postId:postId
	});
});

Meteor.publish('projects',function(){
	return Projects.find({});
})

Meteor.publish('project',function(Id){
	return Projects.find({
		_id:Id
	});
})