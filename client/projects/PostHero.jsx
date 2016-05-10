PostHero = React.createClass({
  getInitialState() {
    return {
      projectData: {}
    }
  },
  render() {
    let styles = {
      root: {
        marginTop: 64,
        backgroundColor: '#03a9f4',
        textAlign: 'center',
        paddingTop: '55px',
        paddingBottom: '55px',
        marginBottom: '30px'
      },
      title: {
        fontSize: '48px',
        color: '#fff',
        marginBottom: '7px',
        lineHeight: 1.1
      },
      category: {
        color: '#fff',
        width: '3rem',
        display: 'block',
        margin: '0 auto',
        border: '1px white solid',
        borderRadius: '10px'
      },
    };
    return (
      <div style={styles.root}>
        <div style={styles.title}>{this.props.name}</div>
        {
          this.props.type === 'project' ? <p style={styles.category}>{this.props.category}</p> : ''
        }
        <p>{this.props.brief}</p>
        <p>{moment(this.props.date).format('MMMM Do YYYY')}</p>
      </div>
    );
  }
});