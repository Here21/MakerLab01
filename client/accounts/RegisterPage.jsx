const{
  TextField,
  RaisedButton,
  DropDownMenu,
  MenuItem
} = MUI;

RegisterPage = React.createClass({
  mixins:[ ReactRouter.History],
  getInitialState(){
    return{
      value: "学生",
      department: "软件工程系"
    }
  },
  handleChange (e, index, value){
    this.setState({value:value});
  },
  departmentChange (e, index, value){
    this.setState({department:value});
  },
  render(){
    const styles = {
      textfield:{

      },
      button: {
        margin: '1rem'
      }
    };
    return (
      <form style={this.props.styles} onSubmit={ this.onSubmitRegister }>
        <TextField
          style={styles.textfield}
          ref='username'
          type='text'
          hintText='字母+数字长度在5-15之间'
          floatingLabelText='账号'/>
        <TextField
          style={styles.textfield}
          ref='email'
          type='text'
          hintText='自己最常使用的邮箱'
          floatingLabelText='邮箱'/>
        <TextField
          style={styles.textfield}
          ref='realName'
          type='text'
          hintText='真实姓名'
          floatingLabelText='姓名'/>
        <DropDownMenu ref="role" value={this.state.value} onChange={this.handleChange}>
          <MenuItem value="学生" primaryText="学生"/>
          <MenuItem value="教师" primaryText="教师"/>
        </DropDownMenu>
        <DropDownMenu ref="department" value={this.state.department} onChange={this.departmentChange}>
          <MenuItem value="计算机科学与技术系" primaryText="计算机科学与技术系"/>
          <MenuItem value="软件工程系" primaryText="软件工程系"/>
          <MenuItem value="数字艺术系" primaryText="数字艺术系"/>
          <MenuItem value="电子工程系" primaryText="电子工程系"/>
          <MenuItem value="信息管理系" primaryText="信息管理系"/>
          <MenuItem value="商务管理系" primaryText="商务管理系"/>
          <MenuItem value="英语系" primaryText="英语系"/>
          <MenuItem value="日语系" primaryText="日语系"/>
          <MenuItem value="俄语系" primaryText="俄语系"/>
          <MenuItem value="继续教育学院" primaryText="继续教育学院"/>
        </DropDownMenu>
        <TextField
          style={styles.textfield}
          ref='password'
          type='password'
          hintText='不可以有非法字符4-16位密码'
          floatingLabelText='密码'/>
        <TextField
          style={styles.textfield}
          ref='rePassword'
          type='password'
          floatingLabelText='确认密码'/>
        <RaisedButton
          style={styles.button}
          type='submit'
          label='注册'
          secondary={true}/>
        <RaisedButton
          style={styles.button}
          label='登录'
          onClick={this.props.onChange.bind(null,'login')}
          secondary={true}/>
      </form>
    )
  },
  onSubmitRegister(event){
    event.preventDefault();

    let username = '';
    let password = '';
    let email = '';
    let profile = {};
    let rePassword = this.refs.rePassword.getValue().trim();

    const usernameRegExp = new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,16}$');
    if(usernameRegExp.test(this.refs.username.getValue().trim())){
      username = this.refs.username.getValue().trim();
    }else{
      alert('账号格式错误！')
    }

    const emailRegExp = new RegExp('^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$','i');
    if(emailRegExp.test(this.refs.email.getValue().trim())){
      email = this.refs.email.getValue().trim();
    }else{
      alert('邮件格式错误！')
    }

    const passwordRegExp = new RegExp('^[a-zA-Z0-9]{4,16}$');
    if(passwordRegExp.test(this.refs.password.getValue().trim())){
      password = this.refs.password.getValue().trim();
    }else{
      alert('密码格式错误！')
    }

    if(!!this.refs.realName.getValue().trim()){
      profile.name = this.refs.realName.getValue().trim();
      profile.department = this.state.department;
      profile.role = this.state.value;
    }

    if (password === rePassword) {
      Accounts.createUser({username: username, email: email, password: password ,profile: profile}, (err) => {
        if (err) {
          alert(err.reason);
          return;
        }
        this.refs.username.clearValue();
        this.refs.password.clearValue();
        this.refs.email.clearValue();
        this.refs.realName.clearValue();
        this.refs.rePassword.clearValue();
        this.history.pushState(null, '/home');
      });
    } else {
      alert('两次密码不一致')
    }
  }
});
