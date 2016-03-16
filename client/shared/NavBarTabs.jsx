const { Paper, Tabs, Tab } = MUI;

NavBarTabs = React.createClass({
   getInitialState() {
    return {routeName: this._requireRoute()};
  },
  _requireRoute(){
    return Meteor.user() ? '/user' : '/login';
  },
  _getLabelName(){
    if (this._requireRoute() === '/user') {
      return Meteor.user().username;
    }else{
      return '登陆';
    }
  },
  render() {
    let styles = {
      root: {
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
        backgroundColor:'#0288D1'
      },
      tabs: {
        width: '300px',
        position: 'absolute',
        right: 60,
        textTransform: 'uppercase',
        color:'#fff'
      },
      tab: {
        height: 64,
        color: '#fff'
      },
      inkBar: {
        backgroundColor: "#fff",
        height: '4px',
        marginTop: '-4px'
      }
    };

    return (
      <Paper 
        rounded={false}
        style={styles.root}>
        <Tabs
          style={styles.tabs}
          tabItemContainerStyle={{backgroundColor:'#0288D1'}}
          inkBarStyle={styles.inkBar}
          value={this.props.tabIndex}
          onChange={this.props.onHandleTabsChange}>
          <Tab
            style={styles.tab}
            value='1'
            label='首页'
            route='/home' />
          <Tab
            style={styles.tab}
            value='2'
            label='项目'
            route='/project' />
          <Tab
            style={styles.tab}
            value='3'
            label={this._getLabelName()}
            route={this._requireRoute()} />
        </Tabs>
      </Paper>
    );
  }
});
