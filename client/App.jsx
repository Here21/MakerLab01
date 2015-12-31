// const { Link } = ReactRouter;
// const { Paper,Tab,Tabs } = mui;
const { AppBar } = mui;



App = React.createClass({
	componentWillMount(){
		this.setState({
			tabIndex: this._getSelectedIndex()
		});

		let setTabsState = function(){
			this.setState({
				renderTabs:!(document.body.clientWidth <= 647 )
			});
		}.bind(this);
		setTabsState();
		window.onresize = setTabsState;

	},

	componentWillReceiveProps(nextProps, nextContext){
		this.setState({
			tabIndex:this._getSelectedIndex()
		});
	},

	getStyles(){
		return {
			footer:{
				padding:'72px 24px',
				backgroundColor: '#212121',
				textAlign: 'center'
			},
			p: {
        		margin: '0 auto',
	       		padding: 0,
        		color: 'rgba(255, 255, 255, 0.54)',
        		fontSize: '1.5em',
        		maxWidth: 500
     		}
		}
	},

	render(){
		let styles = this.getStyles();
		
		return(
			<div>
				{ this.state.renderTabs ? (
					<NavBarTabs
						onHandleTabsChange = {this._handleTabsChange}
						tabIndex = {this.state.tabIndex} />
				) : this._getAppBar() }

				<AppLeftNav ref="leftNav" history={this.props.history} />

				{ this.props.children }

				<div style={styles.footer}>
					<p style={styles.p}>
						 The beautiful attracts the beautiful
					</p>
				</div>
			</div>
		);
	},
	_getSelectedIndex(){
		return this.props.history.isActive('/home') ? '1':
			this.props.history.isActive('/project') ? '2':
			this.props.history.isActive('/login') ? '3':
			this.props.history.isActive('/user') ? '3':'0';
	},

	_handleTabsChange(value, e, tab){
		this.props.history.pushState(null, tab.props.route);
		this.setState({tabIndex:this._getSelectedIndex()});
	},

	_getAppBar(){
		let title = this.props.history.isActive('/home') ? 'Home' : 
			this.props.history.isActive('/project') ? 'Project' :
			this.props.history.isActive('/login') ? 'Lgoin' :
			this.props.history.isActive('/user') ? 'User' : '';

		return (
			<div>
				<AppBar
					onLeftIconButtonTouchTap = {this._onLeftIconButtonTouchTap}
					title={title}
					zDepth={1}
					style={{position:'absolute',top:0}} />
			</div>
		);
	},
	_onLeftIconButtonTouchTap(){
		this.refs.leftNav.toggle();
	}
});