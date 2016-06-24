const {
  Paper,
  IconButton,
  IconMenu,
  MenuItem
} = MUI;

const {SvgIcons} = MUI.Libs;

ProjectCartInUserPage = React.createClass({
  mixins: [ReactMeteorData,ReactRouter.History],
  getMeteorData() {
    let teamId = this.props.item.team;
    Meteor.subscribe("checkTeam", teamId);
    // console.log(Collections.Team.findOne({_id:this.props.item.team}))
    return {
      team:Collections.Team.findOne({_id:this.props.item.team})
    };
  },
  getInitialState(){
    return{
      stateText: this.projectState(),
      stateColor: this.changeColor()
    }
  },
  projectState(){
    if(this.props.item.state === 'closed'){
      return '发布项目';
    } else if (this.props.item.state === 'open'){
      return '关闭项目';
    }
  },
  render(){
    let styles = {
      paper:{
        width: '90%',
        height: '8rem',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 1rem'
      },
      line:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    };
    return(
      <Paper style={styles.paper} zDepth={2}>
        <div style={styles.line}>
          <p style={{color: '#FF4081',fontSize: '1.5rem',fontWeight: 800}}>{this.props.item.name}</p>
          <IconMenu iconButtonElement={
            <IconButton tooltip="管理" touch={true} tooltipPosition="bottom-right">
              <SvgIcons.NavigationMoreVert color="#757575"/>
            </IconButton>}
          >
            <MenuItem primaryText={this.state.stateText} onClick={this.projectPublish}/>
            <MenuItem primaryText="修改信息" onClick={this.modifyInformation}/>
            <MenuItem primaryText="发布招募" onClick={this.createdRecruit}/>
            <MenuItem primaryText="删除" onClick={this.deleteProject}/>
          </IconMenu>
        </div>
        {
          this.data.team !== undefined ?
          <div style={styles.line}>
            <p>{this.data.team.name}</p>
            <p>{'团队人数:' + this.data.team.member.length}</p>
          </div> : ''
        }
        <div style={styles.line}>
          <p style={{color:'#525457',fontSize:'14px'}}>{'发布时间:' + moment(this.props.item.createdAt).format('YYYY MM DD')}</p>
          <p style={{color:this.state.stateColor,fontSize:'14px'}}>{'项目状态:' + this.props.item.state}</p>
        </div>
      </Paper>
    )
  },
  changeColor(){
    if(this.props.item.state === 'closed'){
      return '#e55b46';
    } else if (this.props.item.state === 'open'){
      return '#86D040';
    }
  },
  projectPublish(){
    if(this.props.item.state === 'closed'){
      this.setState({
        stateText: '关闭项目'
      });
      Collections.Projects.update({_id: this.props.item._id},{$set: {state: 'open'}});
    } else if (this.props.item.state === 'open'){
      this.setState({
        stateText: '发布项目'
      });
      Collections.Projects.update({_id: this.props.item._id},{$set: {state: 'closed'}});
    }
  },
  createdRecruit(){
    this.history.pushState(null, `/user/recruit/${this.props.item._id}`)
  },
  modifyInformation(){
    this.history.pushState(null, `/modify/project/${this.props.item._id}`)
  },
  deleteProject(){
    Collections.Projects.remove({_id: this.props.item._id})
  }
});
