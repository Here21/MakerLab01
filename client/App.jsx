// const { Link } = ReactRouter;
// const { Paper,Tab,Tabs } = mui;
const { AppBar } = MUI;


App = React.createClass({
  componentWillMount(){
    this.setState({
      tabIndex: this._getSelectedIndex()
    });
  },

  componentWillReceiveProps(nextProps, nextContext){
    this.setState({
      tabIndex: this._getSelectedIndex()
    });
  },

  getStyles(){
    return {
      footer: {
        padding: '72px 24px',
        backgroundColor: '#212121',
        textAlign: 'center'
      },
      p: {
        padding: 0,
        color: 'rgba(255, 255, 255, 0.54)',
        fontSize: '1.2em',
        maxWidth: 500
      }
    }
  },
  render(){
    let styles = this.getStyles();
    return (
      <div className="app-wrap">
        <NavBarTabs
          className="app-header"
          onHandleTabsChange={this._handleTabsChange}
          tabIndex={this.state.tabIndex}/>
        <div className="app-content">
        { this.props.children }
        </div>
        <div className="app-footer" style={styles.footer}>
          <p style={styles.p}>
            ©大连东软信息学院 2015
          </p>
        </div>
      </div>
    );
  },
  _getSelectedIndex(){
    return this.props.history.isActive('/home') ? '1' :
      this.props.history.isActive('/project') ? '2' :
        this.props.history.isActive('/login') ? '3' :
          this.props.history.isActive('/user') ? '3' : '0';
  },
  _handleTabsChange(value, e, tab){
    this.props.history.pushState(null, tab.props.route);
    this.setState({tabIndex: this._getSelectedIndex()});
  },
});