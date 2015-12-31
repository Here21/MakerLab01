PostHero = React.createClass({
  getInitialState() {
    return {
      
      projectData:{}
    };
  },
  componentWillMount(nextProps) {

   
    console.log(this.props.project);
    this.setState({ 
      //postData: this.data.project
      projectData : this.props.project
      //date : moment(projectData.createdAt).fromNow();
      
    });
    
  
  },
  render() {
    let styles = {
      root: {
        marginTop: 64,
        backgroundColor: '#00bcd4',
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
      date: {
        color: '#fff'
      }
    };

    
    //console.log();
    let title, date;
   
    //console.log(this.);
    return (
      <div style={styles.root}>
        <div className='Test' style={styles.title}>{title}</div>
        <div className='TestTwo' style={styles.date}>{date}</div>
      </div>
    );
  }
});