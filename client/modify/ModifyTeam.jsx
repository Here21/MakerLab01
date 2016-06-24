const {
  TextField,
  FlatButton,
  Paper,
  IconButton
} = MUI;
const {SvgIcons} = MUI.Libs;
const Colors = MUI.Styles.Colors;
const ADD_NUMBER_COUNT = 1;
let members = new Set();
ModifyTeam = React.createClass({
  mixins: [ReactMeteorData,ReactRouter.History],
  getInitialState(){
    return {
      team:undefined,
      memberCount:ADD_NUMBER_COUNT,
      members:''
    }
  },
  getMeteorData(){
    let id = this.props.params.teamId;
    Meteor.subscribe('findTeam', id);
    let team = Collections.Team.findOne({_id: id});
    return {
      team: team
    }
  },
  componentDidMount() {
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
    this.editor.setValue(this.data.team.description);
  },

  // TODO:调整样式，间距和颜色，还有添加成员按钮
  render(){
    let name;
    let brief;
    if (this.data.team !== undefined){
      // this.editor.setValue(this.data.team.description);
      name =  <TextField
        ref="name"
        defaultValue={this.data.team.name}
        floatingLabelText="团队名称"/>
      brief = <TextField
        style={{margin:'2rem'}}
        ref="brief"
        defaultValue={this.data.team.brief}
        hintText="请控制在30字以内"
        onChange={this.checkTextLength}
        floatingLabelText="团队简述"/>
    };
    const styles = {
      wrap: {
        display: 'flex',
        WebkitFlexDirection: 'column',
        WebkitAlignItems: 'center',
        margin: '10rem'
      },
      form: {
        display: 'flex',
        WebkitFlexDirection: 'column',
        WebkitAlignItems: 'center'
      },
      paper:{
        width: '14rem',
        height: '12rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '.5rem .5rem',
        justifyContent: 'space-between',
        fontSize: '12px',
        alignItems: 'center',
        marginBottom: '3rem'
      },
      buttongroup: {
        display: 'flex',
        width: '15rem',
        justifyContent: 'space-between',
        margin: '2rem'
      }
    };
    return (
      <div style={styles.wrap}>
        <form style={styles.form} onSubmit={this.onSubmit}>
          {
            name
          }
          {
            brief
          }
          <textarea ref='textarea' rows="50"/>
        </form>
        <ModifyMemberBar id={this.data.team._id} members={this.data.team.member} captain={this.data.team.captain} onMemberChange={this.onMemberChange}/>
        <div>
          <FlatButton
            label="取消"
            onTouchTap={this.onCancel}/>
          <FlatButton
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
    if (event.target.value.length > 30) {
      alert("简述字数超过限制！")
    }
  },
  handleChange(e, index, value){
    this.setState({value: value})
  },
  // TODO:delete member from ModifyMemberCard component.
  deleteMember(memberId){
    members.delete(memberId);
  },
  onMemberChange(members){
    
  },
  // TODO:onCancel function has not created
  onCancel(){
    this.history.pushState(null, '/user');
  },
  onSubmit(){
    let projectinfo = {};
    projectinfo.authorId = Meteor.userId();
    projectinfo.name = this.refs.name.getValue();
    projectinfo.brief = this.refs.brief.getValue();
    projectinfo.description = this.refs.textarea.value;
  
    Collections.Projects.update({_id: this.data.team._id},{$set: projectinfo}, (error) => {
      if (error) {
        alert(error)
      }
      this.history.pushState(null, '/user')
    });

  }
});
