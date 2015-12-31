Meteor.methods({
  '/blog/getPost': function(postName) {
    // ex = postName === "posts" ?  ".json" : ".md"
    // var post = Assets.getText('post/' + postName + ex);
    // return post;
    var posts	 = Assets.getText('post/posts.json');
    if (postName == "posts") {
    	return posts;
    } else {
    	var postID = parseInt(postName.split('-')[0]);
    	var metaData = JSON.parse(posts)[postID -1];
    	var postContent = Assets.getText('post/'+postName+'.md');
    	return{
    		metaData:metaData,
    		postContent:postContent
    	};
    }
  }
});