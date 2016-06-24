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
    let project = Collections.Projects.findOne({_id:postId});
    let teamId = project.team;
    Meteor.subscribe("findTeam", teamId);
    let team = Collections.Team.findOne({_id:teamId});
    Meteor.subscribe("recruit", postId);
    let recruit = Collections.Recruit.find().fetch();
    return {
      project: project,
      team: team,
      recruit: recruit
    }
  },

  render() {
    let recruit = this.data.recruit.map(item => {
      return <RecruitCard key={item._id} item={item}/>
    });
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
        <MemberBar members={this.data.team.member} />
        {
          recruit
        }
      </div>
    );
  }

});
