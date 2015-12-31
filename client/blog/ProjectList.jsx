const { Link } = ReactRouter;


ProjectList = React.createClass({
  getDate(timeProps){
    var date = moment(timeProps).fromNow();
    return date;
  },
  render() {
    console.log(this.props.projects);
    //遍历list中的每个值，返回包含所有通过predicate真值检测的元素值。
    const projectItems = _.filter(this.props.projects, (project) => {
      return project.projectInfo.projectname.indexOf(this.props.inputText) > -1;
    })
    .map((project) => {
      return (
        <div className="item clearfix" key={project._id}>
          <Link to={`/project/${project._id}`}>
            <div className="icon">{project.masterAccount}</div>
            <div className="title">{project.projectInfo.projectname}</div>
            <div className="category">{project.projectInfo.category}</div>
            <div className="date">{this.getDate(project.createdAt)}</div>
          </Link>
        </div>
      );      
    });

    return (
      <div className={this.props.className}>
        { projectItems }
      </div>
    );
  }
});