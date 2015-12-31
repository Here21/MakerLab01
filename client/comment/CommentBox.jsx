CommentBox = React.createClass({
	propTypes:{
		comments:React.PropTypes.array.isRequired,
		postId:React.PropTypes.number.isRequired
		//React允许我们指定propTypes。React.PropTypes声明了一系列的校验确保我们接收的数据是合法的。如果不合法的数据出现在属性当中，控制台会打印警告信息。
	},

	render(){
		return (
			<div className="comment-box">
				<h3>发表评论 { this.props.comments.length }</h3>
				<CommentList comments={ this.props.comments } />
				<CommentForm postId={this.props.postId} />
			</div>
		);
	}
});