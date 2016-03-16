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
        color: '#b6b6b6'
      },
    };
    return (
      <div style={styles.root}>
        <div style={styles.title}>{this.props.project[0].name}</div>
        <p style={styles.category}>#{this.props.project[0].category}</p>
        <p>{this.props.project[0].createdAt}</p>
        <p>{this.props.project[0].member}</p>
      </div>
    );
  }
});