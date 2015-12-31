const {
	TextField,
	RaisedButton,
	Tabs,
	Tab,
	Paper,
	RadioButtonGroup,
	RadioButton
} = mui;
Login = React.createClass({
	_onSubmitLogin(event){
		event.preventDefault();

		//文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
		//需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。
		let username = this.refs.loginname.getValue().trim();
		let password = this.refs.loginpassword.getValue().trim();
		

		Meteor.loginWithPassword(username,password,(err)=>{
            if (err) {
            	console.log(err);
				alert("failed");
				return;
            }else{
            	this.props.history.replaceState(null, '/home');
            }
        });
	},
	_onSubmitRegister(event){
		event.preventDefault();

		//文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
		//需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。
		let username = this.refs.username.getValue().trim();
		let password = this.refs.password.getValue().trim();
		let rePassword = this.refs.rePassword.getValue().trim();
		
		
		let profile = {
			realname:this.refs.realname.getValue().trim(),
			sex:this.refs.sexGroup.getSelectedValue()
		}

		if (password === rePassword && !_.isEmpty(profile.realname)) {

			Accounts.createUser({username:username,password:password,profile:profile},(err) => {
				if (err){
					console.log(err);
					alert("注册失败!");
					return;
				}
				this.refs.username.clearValue();
				this.refs.password.clearValue();
				this.refs.realname.clearValue();
				this.props.history.replaceState(null, '/home');
			});
		}else{
			alert('请检查注册项目是否为空或密码是否正确')
		};

	},
	render(){
		const styles = {
			paper:{
				    width:'60%',
				    margin: '10rem auto',
				    maxWidth: '50rem',
			        padding: '4rem 3rem'
			},
			tabs:{
				    width: '90%',				    
				    margin: '0 auto'
			},
			textfield:{
				display:'block',
				margin:'0.1rem auto'
			},
			button:{
				display:'block',
			    margin: '3rem auto',
    			width: '10rem'
			}

		}
		return(
			<Paper zDepth={2} style={styles.paper} > 
				<Tabs style={styles.tabs}>
					  <Tab label="登录" >
					  	<form onSubmit={ this._onSubmitLogin }>
					        <TextField
					        	style={styles.textfield}
					            ref="loginname"
					            type='string'
					            floatingLabelText="账号" />	          
					        <TextField
					        	style={styles.textfield}
					            ref="loginpassword"
					            type='password'
					            floatingLabelText="密码" />

					        <RaisedButton	
					        	style={styles.button}		           			            
					            type="submit"
					            label="登录"
					            secondary={true} />
				    	</form>
					  </Tab>
					  <Tab label="注册" >
					  	<form onSubmit={ this._onSubmitRegister }>
					        <TextField
					        	style={styles.textfield}
					            ref="username"
					            type='text'
					            floatingLabelText="账号" />
					        <TextField
					        	style={styles.textfield}
					            ref="realname"
					            type='text'
					            floatingLabelText="真实姓名" />	          
					        <TextField
					        	style={styles.textfield}
					            ref="password"
					            type='password'
					            floatingLabelText="密码" />
					        <TextField
					        	style={styles.textfield}
					            ref="rePassword"
					            type='password'
					            floatingLabelText="确认密码" />
					        <RadioButtonGroup ref='sexGroup' name="shipSpeed" defaultSelected="male">
								<RadioButton
								  value="male"
								  label="男"
								  style={{marginBottom:16,width:0,margin:'12px auto'}} />
								<RadioButton
								  value="female"
								  label="女"
								  style={{marginBottom:16,width:0,margin:'12px auto'}}/>								
							</RadioButtonGroup>
					        <RaisedButton	
					        	style={styles.button}		           			            
					            type="submit"
					            label="注册"
					            secondary={true} />
				    	</form>
					  </Tab>				
				</Tabs>
			</Paper>

			
		);
	}
})