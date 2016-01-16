const{ 
	TextField,
	RaisedButton
} = mui;

CommentForm = React.createClass({
	_onSubmit(event){
		event.preventDefault();

		//文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
		//需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。
		let name = this.refs.name.getValue().trim();
		let email = this.refs.email.getValue().trim().toLowerCase();
		let website = this.refs.website.getValue();
		let comment = this.refs.comment.getValue();
		let postId = this.props.postId;
		console.log(postId);
		Meteor.call('/comments/add',name,email,website,comment,postId,(err) => {
			if (err){
				console.log(err);
				alert("添加评论失败！");
				return;
			}
			this.refs.name.clearValue();
			this.refs.email.clearValue();
			this.refs.website.clearValue();
			this.refs.comment.clearValue();
		});
	},

	getStyle(){
		return {
			 h3: {
		        marginTop: '30px',
		        marginBottom: '-15px',
		        fontWeight: '500',
		        color: '#00bcd4'
		      },

	  		  textField: {
		        display: 'block',
		        width: '100%',
		        height: '80px'
		      },
		      label: {
		        fontWeight: '600',
		        fontSize: '15px'
		      },
		      button: {
		        display: 'block',
		        width: '100px',
		        marginTop: '30px',
		        marginBottom: '15px'
		      }
		};
	},

	render(){
		let styles = this.getStyle();

		return (
	      	<div>
		        <h3 style={styles.h3}>留言板</h3>
		        <form onSubmit={ this._onSubmit }>

		          <TextField
		            ref="name"
		            style={styles.textField}
		            floatingLabelText="名字*" />

		          <TextField
		            ref="email"
		            style={styles.textField}
		            floatingLabelText="邮箱*" />

		          <TextField
		            ref="website"
		            style={styles.textField}
		            floatingLabelText="网站" />

		          <TextField
		            ref="comment"
		            style={styles.textField}
		            floatingLabelText="评论内容*" />

		          <RaisedButton
		            style={styles.button}
		            labelStyle={styles.label}
		            type="submit"
		            label="提交评论"
		            secondary={true} />
		        </form>
	      	</div>
	    );
	}
});