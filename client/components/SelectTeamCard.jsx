const {
  Paper
} = MUI;
SelectTeamCard = React.createClass({
  getInitialState(){
    return {
      zDepth:1
    }
  },
  onHandleClick(){
    this.setState({
      zDepth:3
    });
    let teamInfo = {};
    teamInfo.id = this.props.item._id;
    teamInfo.name = this.props.item.name;
    teamInfo.member = this.props.item.member.length;
    this.props.onChangeTeam(teamInfo);
  },
  render() {
    let styles = {
      paper:{
        width: '14rem',
        height: '15rem',
        margin: '.5rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem .5rem',
        justifyContent: 'space-between',
        fontSize: '12px',
        cursor: 'pointer'
      }
    };
    return (
      <Paper className="select-team-card" style={styles.paper} zDepth={this.state.zDepth} onClick={this.onHandleClick}>
        <h1 style={{margin: '0',color: '#03a9f4',overflowWrap: 'break-word'}}>{this.props.item.name}</h1>
        <p style={{margin: '0',color: '#525457'}}>{'团队人数' + this.props.item.member.length}</p>
        <div style={{display: 'flex',alignItems: 'center',justifycontent: 'space-between',color: '#525457'}}>
          <p style={{margin: '0'}}>{moment(this.props.item.createdAt).format('YYYY-MM-DD')}</p>
          <p style={{margin: '0'}}></p>
        </div>
      </Paper>

    );
  }
});
