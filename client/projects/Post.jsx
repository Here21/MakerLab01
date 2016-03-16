Post = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      post: '',
      postData: {},
      postId: ''
    };
  },

  getPostId(){
    //console.log(this.props.params.postName);
    return this.props.params.postName;
  },

  getMeteorData(){
    const postId = this.getPostId();
    // subscribe to the comments
    Meteor.subscribe("comments", postId);
    Meteor.subscribe("projectPost", postId);
    console.log(Collections.Projects.find().fetch());
    return {
      project: Collections.Projects.find().fetch(),
      comments: Comments.find({}, {sort: {createdAt: 1}}).fetch()
    }
  },

  componentWillMount() {
    // let that = this;
    //let postName = this.props.params.postName;

    this.setState({
      postData: this.data.project,
      postId: this.getPostId()

    });

  },

  render() {
    // Markdown highlight
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    // let html = marked(this.state.post, {sanitize:true});
    let postId = parseInt(this.getPostId());
    //console.log( this.);
    return (
      <div className="post-page">

        <PostHero project={ this.data.project }/>

        <PostContent content={this.data.project }/>

        <CommentBox comments={this.data.comments} postId={this.state.postId}/>
      </div>
    );
  }

});
