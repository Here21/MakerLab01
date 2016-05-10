const{
  TextField,
  RaisedButton
} = MUI;
LoginPage = React.createClass({
  mixins:[ ReactRouter.History],
  render(){
    const styles = {
      textfield:{
        
      },
      button: {
        margin: '.5rem'
      }
    };
    return (
      <div>
        <form style={this.props.styles} onSubmit={ this.onSubmitLogin }>
          <TextField
            style={styles.textfield}
            ref="loginname"
            type='string'
            floatingLabelText="账号"/>
          <TextField
            style={styles.textfield}
            ref="loginpassword"
            type='password'
            floatingLabelText="密码"/>

          <RaisedButton
            style={styles.button}
            type="submit"
            label="登录"
            secondary={true}/>
          <RaisedButton
            style={styles.button}
            label="注册"
            onClick={this.props.onChange.bind(null,"register")}
            secondary={true}/>
        </form>
      </div>
    )
  },
  onSubmitLogin(event){
    event.preventDefault();

    //文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
    //需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。
    let username = this.refs.loginname.getValue().trim();
    let password = this.refs.loginpassword.getValue().trim();


    Meteor.loginWithPassword(username, password, (err)=> {
      if (err) {
        alert(err.reason);
        return;
      } else {
        this.history.pushState(null, '/user');
      }
    });
  }
});
