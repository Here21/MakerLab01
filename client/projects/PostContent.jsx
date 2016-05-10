PostContent = React.createClass({
  getInitialState(){
    return {
      projectData: {}
    }
  },
  componentDidMount(){
    //content = jQuery.parseHTML(this.props.content[0].description)
    //console.log(this.props.content.description)
  },
  content(){
    return {
      __html: this.props.content.description
    }

  },
  render(){
    let styles = {
      root: {
        margin: ' 1rem auto',
        padding: '2rem',
        maxWidth: '45rem',
        minHeight: '40rem'
      }
    };

    return (
      <div dangerouslySetInnerHTML={this.content()} className="postcontent" style={styles.root}>

      </div>
    );
  }
})