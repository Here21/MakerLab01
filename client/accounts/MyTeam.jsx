const {
  Paper,
  IconButton,
  RaisedButton
} = MUI;

const {SvgIcons} = MUI.Libs;

MyTeam = React.createClass({
  mixins:[ ReactRouter.History],
  render(){
    let styles = {
      paper:{
        width: '60rem',
        height: '35rem',
        margin: '2.5rem auto'
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
    return(
      <Paper
        style={styles.paper}
        zDepth={2}>
        <Paper style={styles.add} zDepth={2} circle={true}>
          <IconButton tooltip="创建团队" touch={true} tooltipPosition="bottom-right" onClick={this.publicOpen}>
              <SvgIcons.ContentAdd color="#fff"/>
          </IconButton>
        </Paper>
      </Paper>
    )
  },
  publicOpen(){
    this.history.pushState(null, `/user/${Meteor.userId()}`);
  },
});
