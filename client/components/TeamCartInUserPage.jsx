const {
  Paper,
  IconButton,
  IconMenu,
  MenuItem
} = MUI;

const {SvgIcons} = MUI.Libs;

TeamCartInUserPage = React.createClass({
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
            <MenuItem primaryText="修改信息" onClick={this.modifyInformation}/>
            <MenuItem primaryText="删除" onClick={this.deleteProject}/>
          </IconMenu>
        </div>
        <div style={styles.line}>
          <p>{'团队人数:' + this.props.item.member.length}</p>
        </div>
        <div style={styles.line}>
          <p style={{color:'#525457',fontSize:'14px'}}>{'发布时间:' + moment(this.props.item.createdAt).format('YYYY MM DD')}</p>
        </div>
      </Paper>
    )
  },
  jobOffers(){

  },
  modifyInformation(){

  },
  deleteProject(){
    Collections.Projects.remove({_id: this.props.item._id})
  }
});
