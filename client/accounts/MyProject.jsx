const {
  Paper,
  IconButton,
  RaisedButton
} = MUI;

const {SvgIcons} = MUI.Libs;

MyProject = React.createClass({
  mixins:[ ReactRouter.History],
  render(){
    let styles = {
      paper:{ 
        width: '60rem',
        height: '35rem',
        margin: '2.5rem auto',
        padding: '1rem 0',
        overflowY: 'scroll'
      },
      add:{
        width:'4rem',
        height:'4rem',
        lineHeight:'4rem',
        backgroundColor:'#FF4081',
        textAlign: 'center',
        position: 'absolute',
        right: '1rem',
        top: '-2rem'
      }
    };
    const itemList = this.props.myProjects.map(item => {
      return <ProjectCartInUserPage key={item._id} item={item} />
    });
    return(
      <Paper
        style={styles.paper}
        zDepth={2}>
        <Paper style={styles.add} zDepth={2} circle={true}>
          <IconButton tooltip="创建项目" touch={true} tooltipPosition="bottom-right" onClick={this.publicOpen}>
            <SvgIcons.ContentAdd color="#fff"/>
          </IconButton>
        </Paper>
        {itemList}
      </Paper>
    )
  },
  publicOpen(){
    this.history.pushState(null, `/user/project/${Meteor.userId()}`);
  },
});
