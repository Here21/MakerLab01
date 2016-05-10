const {
  TextField,
  FlatButton,
  IconButton
} = MUI;
const {SvgIcons} = MUI.Libs;
const Colors = MUI.Styles.Colors;

const ADD_NUMBER_COUNT = 1;
var members = new Set();
CreateTeam = React.createClass({
  getInitialState(){
    return {
      memberCount:ADD_NUMBER_COUNT,
      munbers:[]
    }
  },
  componentDidMount() {
    members.add(Meteor.user().username);
    // TODO:Anyway, the captain will be added,but need a inform to remind user
    var textbox = ReactDOM.findDOMNode(this.refs.textarea);
    this.editor = new Simditor({
      textarea: $(textbox),
      placeholder: '这里输入内容...',
      toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color',
        'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'indent', 'outdent', 'alignment', 'hr'],
      //upload: {
      //  url: '', //文件上传的接口地址
      //  params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
      //  fileKey: 'fileDataFileName', //服务器端获取文件数据的参数名
      //  connectionCount: 3,
      //  leaveConfirm: '正在上传文件'
      //}
    });
  },
  render() {
    const styles = {
      wrap: {
        display: 'flex',
        WebkitFlexDirection: 'column',
        WebkitAlignItems: 'center',
        margin: '10rem'
      },
      form:{
        display: 'flex',
        WebkitFlexDirection: 'column',
        WebkitAlignItems: 'center'
      }
    };
    return (
      <div style={styles.wrap}>
        <form style={styles.form} onSubmit={this.onSubmit}>
          <TextField
            ref="name"
            floatingLabelText="团队名称"/>
          <TextField
            ref="brief"
            hintText="请控制在30字以内"
            onChange={this.checkTextLength}
            floatingLabelText="团队简介"/>
          <MemberList memberCount={this.state.memberCount} getMembers={this.getMembers}/>
          <IconButton tooltip="添加队员" style={{margin: '2rem'}} tooltipPosition="top-center" onClick={this.addNumber}>
            <SvgIcons.ContentAddCircleOutline color={Colors.lightBlue700}/>
          </IconButton>
          <textarea ref='textarea' rows="50"/>
        </form>
        <div style={{margin:'2rem'}}>
          <FlatButton
            style={{marginRight:'1rem'}}
            label="取消"
            onTouchTap={this.onCancel}/>
          <FlatButton
            style={{marginLeft:'1rem'}}
            label="确认"
            primary={true}
            type="submit"
            keyboardFocused={true}
            onTouchTap={this.onSubmit}/>
        </div>
      </div>
    );
  },
  checkTextLength(event){
    // TODO:More elegant way of checking
    if(event.target.value.length > 30){
      alert("简述字数超过限制！")
    }
  },
  addNumber(){
    this.setState({
      memberCount:this.state.memberCount + ADD_NUMBER_COUNT
    });
  },
  getMembers(value){
    members.add(value);
  },
  onSubmit(){
    let temp = [];
    for (let item of members){
      temp.push(item);
    }
    let teamInfo = {};
    teamInfo.captain = Meteor.userId();
    teamInfo.name = this.refs.name.getValue();
    teamInfo.member = temp;
    teamInfo.brief = this.refs.brief.getValue();
    teamInfo.description = this.refs.textarea.value;
    teamInfo.createdAt = new Date();

    Collections.Team.insert(teamInfo,(error) =>{
      if (error){
        alert(error.reason);
      }
      this.props.history.replaceState(null, '/user');
    });

  }
});
