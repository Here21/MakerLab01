TabsControl = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    parentStyle: React.PropTypes.object,
    childrenStyle: React.PropTypes.object,
    changeCategory: React.PropTypes.func
  },
  getInitialState() {
    return {
      currentIndex: 0
    };
  },
  onHandleClick(value) {
    this.props.changeCategory(value);
  },
  getItemCssClasses(index) {
    return index === this.state.currentIndex ? 'item active' : 'item';
  },
  render() {
    let children = React.Children.map(this.props.children, (element, index) => {
      return (
        <li
          style={this.props.childrenStyle}
          onClick={() => {
            this.setState({
              currentIndex: index
            });
            this.onHandleClick(element.props.name);
          }}
          className={this.getItemCssClasses(index)}
        >{element.props.name}</li>
      );
    });
    return (
      <ul style={this.props.parentStyle}>
        {
          children
        }
      </ul>
    );
  }
});
