ProjectList = React.createClass({
  render() {
    const projectItems =this.props.projects.map((project) => {
      return (
        <ProjectListCard key={project._id} item={project}/>
      );      
    });

    return (
      <div style={{display: 'flex',flexWrap: 'wrap',width: '60rem',margin: '1rem auto'}}>
        { projectItems }
      </div>
    );
  }
});