const {
  Paper,
  RaisedButton,
  Avatar,
  Dialog
  } = MUI;

const { Link } = ReactRouter;

User = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState(){
    return{
      open:false,
      openPublic:false
    }
  },
  getMeteorData() {
    Meteor.subscribe("person", Meteor.userId());
    let person = Collections.Person.find().fetch();
    Meteor.subscribe("myPost",Meteor.userId());
    console.log(Collections.Projects.find().fetch());
    return {
      currentUser: Meteor.user(),
      userInfo:person,
      myProjects:Collections.Projects.find().fetch()
    };
  },
  render(){
    let styles = {
      paper: {
        width: '60%',
        margin: '10rem auto',
        maxWidth: '50rem',
        padding: '0 3rem',
        backgroundColor: '#BCE5FC',
        textAlign: 'center',
        display: 'flex',
        WebkitFlexDirection: 'column'
      },
      button: {
        margin: '1rem 1rem',
        width:'5rem'
      }
    };
    return (
      <div>
        <PersonalInfo key='person' open={this.state.open} handleOpen={this.handleOpen} handleClose={this.handleClose}/>
        <Paper
          zDepth={1}
          style={styles.paper}>
          <div style={{display: 'flex',WebkitJustifyContent: 'center', WebkitAlignItems: 'center',margin:'2rem 0'}}>
            <Avatar
              style={styles.avatar}
              size={80}
              src="images/circle-accounts.svg"/>
            <div style={{width:"10rem"}}>
              {
                this.data.userInfo.length > 0 ?
                  <div>
                    <p>{this.data.userInfo[0].name}</p>
                    <p>{this.data.userInfo[0].major}/{this.data.userInfo[0].grade}</p>
                  </div>:<p>创客</p>
              }
            </div>
          </div>
          <div>
            {
              this.data.userInfo.length > 0 ?
                <p>{this.data.userInfo[0].skill}</p> : ''
            }
          </div>
          <div>
            <RaisedButton
              style={styles.button}
              label="注销"
              onClick={this._userLogOut}/>
            {
              this.data.userInfo.length > 0 ? "":
              <RaisedButton
                style={styles.button}
                label="完善资料"
                secondary={true}
                onClick={this.handleOpen}/>
            }
          </div>
        </Paper>
        <Paper style={styles.paper} className="blog-list">
          <RaisedButton
            style={styles.button}
            label="发布项目"
            primary={true}
            onClick={this.publicOpen}/>
        {
          this.data.myProjects.map((project) => {
            return (
              <div className="item clearfix" key={project._id}>
                <Link to={`/project/${project._id}`}>
                  <div className="icon">{project.category}</div>
                  <div className="title">{project.name}</div>
                  <div className="date">{project.createdAt}</div>
                </Link>
              </div>
            );

          })
        }
        </Paper>
      </div>
    )
  },
  handleOpen(){
    this.setState({open: true});
  },
  handleClose(){
    this.setState({open: false});
  },
  publicOpen(){
    this.props.history.pushState(null, `user/${this.data.currentUser._id}`);
  },
  _userLogOut(){
    Meteor.logout(function(error){
      return error;
    });
    this.props.history.pushState(null,"/login")
  }

});