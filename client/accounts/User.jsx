const {
	Paper,
	RaisedButton,
	Avatar,
} = mui;

User = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
	    return {
	    	currentUser: Meteor.user()
	    };
  	},
  	selectSex(){
  		if (this.data.currentUser.profile.sex === 'male') {
  			return 'images/male.png';
  		}else {
  			return 'images/female.png';
  		}
  	},
  	_userLogOut(){
  		Meteor.logout();
  		//replaceState()方法会修改当前历史记录条目而并非创建新的条目
  		this.props.history.replaceState(null, '/login');
  	},
  	_takeOpen(){
  		this.refs.dialog.onShow();
  	},
  	publishProject(){
  		this.props.history.replaceState(null, '/user/publish');
  	},

	render(){
		let styles = {
			paper:{
			    width:'60%',
			    margin: '10rem auto',
			    maxWidth: '50rem',
		        padding: '4rem 3rem',
		        backgroundColor:'#BCE5FC',
		        textAlign: 'center'
			},
			avatar:{
			    margin: '1rem auto',
    			display: 'block'
			},
			button:{
				margin:'1rem'
			}
			
		};
		return (
			<Paper 
				zDepth={1} 
				style={styles.paper}>
				<Avatar 
					style={styles.avatar}
					size={80} 
					src="images/circle-accounts.svg" />
				<p>{this.data.currentUser.profile.realname}</p>
				<p>创客</p>
				<Avatar 
					style={styles.avatar}
					size={25} 
					src={this.selectSex()} />
				<RaisedButton 
					style={styles.button}
		            label="发布项目"
		            primary={true} 
		            onClick={this.publishProject} /> 
		        <RaisedButton 
					style={styles.button}
		            label="注销"
		            secondary={true}
		            onClick={this._userLogOut} />		        
			</Paper>
		)
	},
})