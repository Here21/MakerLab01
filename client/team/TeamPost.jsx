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
    let hero;
    if (this.data.project !== undefined){
      hero = <PostHero
        name={this.data.project.name}
        brief={this.data.project.brief}
        date={this.data.project.createdAt}
        type="team"
      />
    }
    return (
      <div className="post-page">
        {hero}
        <PostContent content={this.data.project }/>
        {/*
         <CommentBox comments={this.data.comments} postId={this.state.postId}/>
         */}
        <MemberBar members={this.data.project.member} />
      </div>
    );
  }

});
