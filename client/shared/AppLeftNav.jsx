const { LeftNav } = mui;

let menuItems = [
	{ route: '/home',text:'Home' },
	{ route: '/project',text:'Project' },
	{ route: '/login',text:'Login' },
];

AppLeftNav = React.createClass({
	render(){
		let styles = {
			header:{
				cursor:'pointer',
				fontSize:'24px',
				color:'#fff',
				lineHeight: '64px',
				fontWeight: '300',
				backgroundColor: '#00bcd4',
				paddingLeft: '24px',
				paddingTop: '0px',
				marginBottom: '8px'				
			}
		};

		let header = (
				<div style={styles.header} onTouchTap={this._onHeaderClick}>
					Modern Demo
				</div>
		);

		return (
			<LeftNav
				ref='LeftNav'
				docked={false}
				isInitiallyOpen={false}
				header={header}
				menuItems={menuItems}
				selectedIndex={this._getSelectedIndex()}
				onChange={this._onLeftNavChange} />
		);
	},

	toggle(){
		this.refs.LeftNav.toggle();
	},

	_getSelectedIndex(){
		let currentItem;

		// !!!!!!!!!!!!!there  'let i' had to marked
		for (let i = menuItems.length - 1; i >= 0; i--){
			currentItem = menuItems[i];
			if (currentItem.route && this.props.history.isActive(currentItem.route)) {
				// i --> ES6 checked 
				// console.log(i);
				return i;
			};
		};
	},

	_onLeftNavChange(e, key, payload) {
    	this.props.history.pushState(null, payload.route);
  	},


	_onHeaderClick(){
		this.props.history.pushState(null,'/');
		this.refs.LeftNav.close();
	}

});