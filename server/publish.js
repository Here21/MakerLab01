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

Meteor.publish('projects', function(selector, limit) {
	if (selector === undefined && limit === undefined) {
		return Collections.Projects.find();
	} else if (limit === undefined) {
		return Collections.Projects.find(selector);
	} else {
		return Collections.Projects.find(selector, {limit: limit});
	}
});

Meteor.publish('teams', function(selector, limit) {
	if (selector === undefined && limit === undefined) {
		return Collections.Team.find();
	} else if (limit === undefined) {
		return Collections.Team.find(selector);
	} else {
		return Collections.Team.find(selector, {limit: limit});
	}
});

Meteor.publish('projectPost',function(id){
	return Collections.Projects.find({_id:id});
});

Meteor.publish('myPost',function(id){
	return Collections.Projects.find({authorId:id});
});
// TODO:优化数据库publish名称
Meteor.publish('checkTeam',function(id) {
	return Collections.Team.find({captain:id})
})

Meteor.publish('findTeam',function (id) {
	return Collections.Team.find({_id:id})
})


Collections.Projects.allow({
	insert: hasLoggedIn,
	remove: hasLoggedIn,
	update: hasLoggedIn
});

Collections.Team.allow({
	insert: hasLoggedIn,
	remove: hasLoggedIn,
	update: hasLoggedIn
});

Meteor.publish("findNumber",function(username){
	return Meteor.users.find({username:username})
});
