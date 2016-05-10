ProjectPost = React.createClass({
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
    Meteor.subscribe("projectPost", postId);
    return {
      project: Collections.Projects.findOne({_id:postId})
    }
  },

  render() {
    return (
      <div className="post-page">
        <PostHero
          name={this.data.project.name}
          category={this.data.project.category}
          brief={this.data.project.brief}
          date={this.data.project.createdAt}
          type="project"
        />

        <PostContent content={this.data.project }/>
        {/*
        <CommentBox comments={this.data.comments} postId={this.state.postId}/>
        */}
      </div>
    );
  }

});
