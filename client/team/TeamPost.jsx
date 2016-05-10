TeamPost = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      post: '',
      postData: {},
      postId: ''
    };
  },

  getPostId(){
    return this.props.params.postName;
  },

  getMeteorData(){
    const postId = this.getPostId();
    Meteor.subscribe("findTeam", postId);
    return {
      project: Collections.Team.findOne({_id:postId})
    }
  },

  render() {
    return (
      <div className="post-page">
        <PostHero
          name={this.data.project.name}
          brief={this.data.project.brief}
          date={this.data.project.createdAt}
          type="team"
        />

        <PostContent content={this.data.project }/>
        {/*
         <CommentBox comments={this.data.comments} postId={this.state.postId}/>
         */}
      </div>
    );
  }

});
