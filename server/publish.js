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

Collections.Recruit.allow({
	insert: hasLoggedIn,
	remove: hasLoggedIn,
	update: hasLoggedIn
});

// Collections.ProjectImages.allow({
// 	insert: hasLoggedIn,
// 	remove: hasLoggedIn,
// 	update: hasLoggedIn,
// 	download: hasLoggedIn
// });

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

Meteor.publish('projects', function(selector, options) {
	// if (selector === undefined && limit === undefined) {
	// 	return Collections.Projects.find();
	// } else if (limit === undefined) {
	// 	return Collections.Projects.find(selector);
	// } else {
	// 	return Collections.Projects.find(selector, {limit: limit});
	// }
	return Collections.Projects.find(selector, options);
});

Meteor.publish('teams', function(selector, options) {
	// if (selector === undefined && limit === undefined) {
	// 	return Collections.Team.find();
	// } else if (limit === undefined) {
	// 	return Collections.Team.find(selector);
	// } else {
	// 	return Collections.Team.find(selector, {limit: limit});
	// }
	return Collections.Team.find(selector, options);
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

Meteor.publish("findNumber",function(username){
	return Meteor.users.find({username:username})
});

Meteor.publish('members', function(ids) {
	return Meteor.users.find({username: {$in: ids}});
});

Meteor.publish('recruit',function (id) {
	return Collections.Recruit.find({projectId:id})
});

Meteor.publish('findRecruit',function (id) {
	return Collections.Recruit.find({_id:id})
});

Meteor.publish('recruits', function(selector, options) {
	// if (selector === undefined && limit === undefined) {
	// 	return Collections.Recruit.find();
	// } else if (limit === undefined) {
	// 	return Collections.Recruit.find(selector);
	// } else {
	// 	return Collections.Recruit.find(selector, {limit: limit});
	// }
	return Collections.Recruit.find(selector, options);
});