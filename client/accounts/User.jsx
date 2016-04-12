const {
  RaisedButton,
  Avatar,
  Tabs,
  Tab
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
    Meteor.subscribe("myPost",Meteor.userId());
    console.log(Collections.Projects.find().fetch());
    return {
      currentUser: Meteor.user(),
      myProjects:Collections.Projects.find().fetch()
    };
  },
  getGravatar(){
    let md5Hash = Gravatar.hash(Meteor.user().emails[0].address);
    return url = `http://gravatar.com/avatar/${md5Hash}.png?s=512&d=monsterid`
  },
  render(){
    let styles = {
      wrap: {
        display: 'flex',
        flexDirection: 'column',
        WebkitJustifyContent: 'center',
        WebkitAlignItems: 'center',
        textAlign:'center',
        height: '40rem',
        padding: '5rem'
      },
      button: {
        margin: '1rem 1rem',
        width:'5rem'
      }
    };
    return (
      <div>
        <div style={styles.wrap}>
          <Avatar
            style={styles.avatar}
            size={80}
            src={this.getGravatar()}/>
          <div style={{width:"10rem",margin:'3rem 0'}}>
            <div>
              <h1 style={{color:"#2196F3"}}>{this.data.currentUser.profile.name}</h1>
              <p>{this.data.currentUser.profile.grade}</p>
              <p>{this.data.currentUser.profile.role}</p>
            </div>
          </div>
          <RaisedButton
            style={styles.button}
            label="注销"
            onClick={this._userLogOut}/>
        </div>
        <div style={{width: '100%', height: '3rem', backgroundColor: '#b6b6b6', position: 'absolute'}}></div>
        <Tabs
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:'#e6e6e6'}}
          tabItemContainerStyle={{backgroundColor:'#b6b6b6',width:'20rem',zIndex: '1'}}
          inkBarStyle={{zIndex:1}}
          value={this.state.value}
          onChange={this.handleChange}>
          <Tab label="我的项目" value="a" >
            <MyProject myProjects={this.data.myProjects} />
          </Tab>
          <Tab label="我的团队" value="b">
            <MyTeam />
          </Tab>
        </Tabs>

      </div>
    )
  },

  handleClose(){
    this.setState({open: false});
  },

  _userLogOut(){
    Meteor.logout(function(error){
      return error;
    });
    this.props.history.pushState(null,"/login")
  }

});