const {
  Paper,
  Avatar
} = MUI;
const {SvgIcons} = MUI.Libs;

ModifyMemberCard = React.createClass({
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
      },
      p: {
        margin: 0
      },
      delete: {
        fontStyle: 'italic',
        textDecoration: 'underline',
        color: 'red',
        cursor: 'pointer',
        border: '0',
        background: 'transparent'
      }
    };
    return (
      <Paper style={styles.paper} zDepth={2}>
        <Avatar
          size={80}
          src={this.getGravatar()}/>
        <h1 style={{margin: '0',color: '#03a9f4',overflowWrap: 'break-word'}}>{this.props.item.profile.name}</h1>
        <p style={styles.p}>{this.props.item.profile.grade}</p>
        <p style={styles.p}>{this.props.item.profile.role}</p>
        <p style={styles.p}>{this.props.item.emails[0].address}</p>
        {
          this.props.captain === this.props.item._id ? '' :
            <button style={styles.delete} onClick={this.deleteMember}>删除该成员</button>
        }
      </Paper>
    );
  },
  deleteMember(){
    //console.log(this.props.item.username);
    this.props.deleteMember(this.props.item.username)
  }
});
