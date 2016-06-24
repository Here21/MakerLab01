const {
  Paper,
  Avatar
} = MUI;

MemberCard = React.createClass({
  getGravatar(){
    let md5Hash = Gravatar.hash(this.props.item.emails[0].address);
    return url = `http://gravatar.com/avatar/${md5Hash}.png?s=512&d=monsterid`
  },
  render(){
    let styles = {
      paper:{
        width: '14rem',
        height: '16rem',
        margin: '.5rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem .5rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px'
      }
    };
    return (
      <Paper style={styles.paper} zDepth={2}>
        <Avatar
          style={styles.avatar}
          size={80}
          src={this.getGravatar()}/>
        <h1 style={{margin: '0',color: '#03a9f4',overflowWrap: 'break-word'}}>{this.props.item.profile.name}</h1>
        <p>{this.props.item.profile.grade}</p>
        <p>{this.props.item.profile.role}</p>
        <p>{this.props.item.emails[0].address}</p>
      </Paper>
    )
  }
});
