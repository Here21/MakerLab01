Post = React.createClass({
  mixins:[ReactMeteorData],

  getInitialState() {
    return {
      post: '',
      postData:{}
    };
  },

  getPostId(){
    console.log(this.props.params.postName);
    return this.props.params.postName;
  },

  getMeteorData(){
    const postId = this.getPostId();
    // subscribe to the comments
    Meteor.subscribe("comments",postId);
    Meteor.subscribe("project",postId);

    return {
      project:Projects.find({_id:postId}).fetch(),
      comments:Comments.find({},{sort:{createdAt:1}}).fetch(),
    }
  },

  componentWillMount() {
    // let that = this;
    //let postName = this.props.params.postName;

      this.setState({ 
        postData: this.data.project
        
      });
  
  },

  render() {
    // Markdown highlight 
    marked.setOptions({
      highlight:function (code){
        return hljs.highlightAuto(code).value;
      }
    });
   
    // let html = marked(this.state.post, {sanitize:true});
    let postId = parseInt(this.getPostId());
    console.log( this.state.postData);
    return (
      <div className="post-page">

        <PostHero project = { this.state.postData } />
        
        <CommentBox comments={this.data.comments} postId={postId} />
      </div>
    );
  }

});
