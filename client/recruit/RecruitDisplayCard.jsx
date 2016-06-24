const {
  Paper
} = MUI;
const { Link } = ReactRouter;

RecruitDisplayCard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let teamId = this.props.item.team;
    Meteor.subscribe("findTeam", teamId);
    return {
      team:Collections.Team.findOne({_id:teamId})
    };
  },
  render(){
    let styles = {
      paper:{
        width: '14rem',
        height: '15rem',
        margin: '.5rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem .5rem',
        justifyContent: 'space-between',
        fontSize: '12px'
      },
      link:{
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem .5rem',
        justifyContent: 'space-between',
        fontSize: '12px',
        textDecoration: 'none',
        width: '100%',
        height: '100%'
      },
      line:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    };
    return (
      <Paper style={styles.paper} zDepth={2}>
        <Link style={styles.link} to={`/recruit/${this.props.item._id}`}>
          <h1 style={{margin: '0',color: '#03a9f4',overflowWrap: 'break-word'}}>{this.props.item.title}</h1>
          <p style={{margin: '0',color: '#FF4081',fontWeight: 800,fontSize: '18px'}}>{this.props.item.position}</p>
          <p style={{margin: '0',color: '#525457',fontStyle: 'italic'}}>{this.props.item.benefit}</p>
          <div style={{display: 'flex',alignItems: 'center',justifycontent: 'space-between',color: '#525457'}}>
            <p style={{margin: '0'}}>{moment(this.props.item.createdAt).fromNow()}</p>
            <p style={{margin: '0'}}></p>
          </div>
        </Link>
      </Paper>
    )
  }
});
