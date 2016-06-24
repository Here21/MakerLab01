const {
  Paper
} = MUI;

const { Link } = ReactRouter;

RecruitCard = React.createClass({
  render() {
    let styles = {
      paper:{
        width: '90%',
        height: '8rem',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 1rem',
        maxWidth: '50rem'
      },
      line:{
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        fontSize: '1.5rem',
        margin: '0',
        color: '#777'
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
      position: {
        color: '#AEEA00',
        marginRight: '1rem',
        display: 'block',
        border: '1px #AEEA00 solid',
        borderRadius: '10px',
        height: '2rem',
        lineHeight: '2rem'
      }
    };
    return (
      <Paper style={styles.paper} zDepth={2}>
        <Link style={styles.link} to={`/recruit/${this.props.item._id}`}>
          <h1 style={styles.title}>{this.props.item.title}</h1>
          <div style={styles.line}>
            <h2 style={styles.position}>{this.props.item.position}</h2>
            <p style={{color: '#525457', fontSize: '1.2rem'}}>{'薪资/福利:' + this.props.item.benefit}</p>
          </div>
          <p style={{color: '#525457', fontSize: '14px'}}>{'发布时间:' + moment(this.props.item.createdAt).format('YYYY MM DD')}</p>
        </Link>
      </Paper>
    )
  }
});
