const {
	Paper,
	TextField,
	RadioButtonGroup,
	RadioButton,
	FlatButton,
	RaisedButton

} = mui;

ProjectForm = React.createClass({
	getInitialState(){
		return {
			showDialogScrollable:this.props.dialogScrollable
		}
	},
	confirmSubmit(){
		let master = Meteor.user().username;
		
		let projectinfo = {
			projectname : this.refs.projectname.getValue().trim(),
			category : this.refs.category.getSelectedValue(),
			projectbrief : this.refs.projectbrief.getValue().trim()
		}
		let personinfo = {
			teamname : this.refs.teamname.getValue().trim(),
			leadername : this.refs.leadername.getValue().trim(),
			tel : this.refs.tel.getValue().trim(),
			department : this.refs.department.getValue().trim()

		}

		Meteor.call('publishProject',master,projectinfo,personinfo,(err)=>{
			if (err) {
				console.log(err);
				alert('发布项目失败')
				return;
			}
			alert("success!")
			this.props.history.replaceState(null, '/user');
		})
	},

	render(){
		let styles = {
			paper:{			
			    width:'60%',
			    margin: '10rem auto',
			    maxWidth: '50rem',
		        padding: '4rem 3rem',
		        display:'table'
			},
			title:{
				color:'#727272'
			},
			textfield:{
				display:'block',
				margin:'1rem auto'
			},
			radiobutton:{
			    margin: '1rem auto',
    			width: '10rem',
    			
			},
			test:{
				color:'green'
			},
			buttongroup:{
				margin:'5rem auto',
				float:'right'
			}
		}
		return (
			<Paper
				style={styles.paper} 
				zDepth={1} >
				
				<h2 style={styles.title}>项目信息：</h2>
				<TextField
		        	style={styles.textfield}
		            ref="projectname"
		            type='text'
		            underlineStyle={{borderColor: '#212121'}}
		            floatingLabelStyle={{color: '#212121'}}
		            floatingLabelText="项目名称" />
			  	<RadioButtonGroup 
			  		style={styles.group}
			  		className='group' 
			  		ref='category' 
			  		name="shipSpeed" 
			  		defaultSelected="移动互联网">
					<RadioButton
						style={styles.radiobutton}
					  	value="移动互联网"
					  	label="移动互联网"					  	
					  />
					<RadioButton
						style={styles.radiobutton}					
					  	value="O2O"
					  	label="O2O"
					   />
					<RadioButton
						style={styles.radiobutton}
					  	value="软件服务"
					  	label="软件服务"
					  />
					<RadioButton
						style={styles.radiobutton}
					  	value="电子商务"
					  	label="电子商务"
					  />
				  	<RadioButton
						style={styles.radiobutton}
					  	value="媒体"
					  	label="媒体"
					  />
					<RadioButton
						style={styles.radiobutton}
					  	value="教育"
					  	label="教育"
					  />		
					<RadioButton
						style={styles.radiobutton}
					  	value="游戏"
					  	label="游戏"
					  />										
				</RadioButtonGroup>
		        <TextField
		        	style={styles.textfield}
		            ref="projectbrief"
		            type='text'
		            fullWidth={true}
		            underlineStyle={{borderColor: '#212121'}}
		            floatingLabelStyle={{color: '#212121'}}
		            multiLine={true}
		            floatingLabelText="项目概要"
		            hintText="请保持在200字左右" />
		        <h2 style={styles.title}>负责人信息：</h2>
		        <TextField		  
		        	style={styles.textfield}      	
		            ref="teamname"
		            type='text'
		            underlineStyle={{borderColor: '#212121'}}
		            floatingLabelStyle={{color: '#212121'}}
		            floatingLabelText="团队名" />
	          	<TextField	
	          		style={styles.textfield}	        	
		            ref="leadername"
		            type='text'		           
		            underlineStyle={{borderColor: '#212121'}}
		            floatingLabelStyle={{color: '#212121'}}
		            floatingLabelText="队长姓名" /> 
		        <TextField		
		        	style={styles.textfield}        	
		            ref="tel"
		            type='text'
		            underlineStyle={{borderColor: '#212121'}}
		            floatingLabelStyle={{color: '#212121'}}
		            floatingLabelText="电话" />    
		        <TextField		
		        	style={styles.textfield}        	
		            ref="department"
		            type='text'		            
		            underlineStyle={{borderColor: '#212121'}}
		            floatingLabelStyle={{color: '#212121'}}
		            floatingLabelText="所在系" />
		        <p>团队成员功能正在施工</p>
		        <div style={styles.buttongroup}>
		        	<FlatButton style={{marginRight:'1rem'}} label="取消" />
		        	<RaisedButton label="发布" primary={true} onClick={this.confirmSubmit}/>
		        </div>
			</Paper>
		)
	}
})