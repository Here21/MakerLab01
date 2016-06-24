RecruitPost = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      post: '',
      postData: {},
      postId: ''
    };
  },
  
  getMeteorData(){
    const postId = this.props.params.projectId;
    Meteor.subscribe("findRecruit", postId);
    let recruit = Collections.Recruit.findOne({_id:postId});
    Meteor.subscribe('projectPost', recruit.projectId);
    let project = Collections.Projects.findOne({_id:recruit.projectId});
    return {
      recruit: recruit,
      project: project
    }
  },
  // TODO:招募页面的标题栏，要包括项目名称
  render() {
    return (
      <div className="post-page">
        <RecruitHeard item={this.data.recruit} project={this.data.project}/>
        <PostContent content={this.data.recruit }/>
        {/*
         <CommentBox comments={this.data.comments} postId={this.state.postId}/>
         */}
      </div>
    );
  }

});
