PostHero = React.createClass({
  getInitialState() {
    return {
      projectData: {}
    }
  },

  componentWillMount() {
    this.setState({ 

      projectData : this.props.project

    });
  },
  getProjectName(projectInfo){
    return projectInfo.projectInfo.projectname;
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

    //console.log(this.state.projectData[0]);
    return (
      <div style={styles.root}>
        <div style={styles.title}>{this.getProjectName(this.state.projectData[0])}</div>
        <p style={styles.category}># {this.state.projectData[0].projectInfo.category}</p>
      </div>
    );
  }
});