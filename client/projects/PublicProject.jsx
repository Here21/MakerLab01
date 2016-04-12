const {
  DropDownMenu,
  MenuItem,
  TextField,
  FlatButton,
  IconButton
  } = MUI;

const {SvgIcons} = MUI.Libs;

const Colors = MUI.Styles.Colors;

const ADD_NUMBER_COUNT = 1;

var members = new Set();

PublicProject = React.createClass({
  getInitialState(){
    return {
      value: "移动互联网",
      memberCount:ADD_NUMBER_COUNT,
      munbers:[]
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
  },
  // TODO:调整样式，间距和颜色，还有添加成员按钮
  render(){
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
            floatingLabelText="项目名称"/>
          <DropDownMenu value={this.state.value} rer="category" onChange={this.handleChange}>
            <MenuItem value={"移动互联网"} primaryText="移动互联网"/>
            <MenuItem value={"O2O"} primaryText="O2O"/>
            <MenuItem value={"软件服务"} primaryText="软件服务"/>
            <MenuItem value={"电子商务"} primaryText="电子商务"/>
            <MenuItem value={"新媒体"} primaryText="新媒体"/>
            <MenuItem value={"教育"} primaryText="教育"/>
            <MenuItem value={"游戏"} primaryText="游戏"/>
            <MenuItem value={"其他"} primaryText="其他"/>
          </DropDownMenu>
          <TextField
            ref="brief"
            hintText="请控制在30字以内"
            onChange={this.checkTextLength}
            floatingLabelText="项目简述"/>
          <MemberList memberCount={this.state.memberCount} getMembers={this.getMembers}/>
          <IconButton tooltip="添加队员" tooltipPosition="top-center" onClick={this.addNumber}>
            <SvgIcons.ContentAddCircleOutline color={Colors.lightBlue700}/>
          </IconButton>
          <textarea ref='textarea' rows="50"/>
        </form>
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
    )
  },
  checkTextLength(event){
    if(event.target.value.length > 30){
      alert("简述字数超过限制！")
    }
  },
  handleChange(e, index, value){
    this.setState({value: value})
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
    let projectinfo = {};
    projectinfo.authorId = Meteor.userId();
    projectinfo.name = this.refs.name.getValue();
    projectinfo.category = this.state.value;
    projectinfo.member = temp;
    projectinfo.state = 'closed';
    projectinfo.brief = this.refs.brief.getValue();
    projectinfo.description = this.refs.textarea.value;
    projectinfo.createdAt = new Date();

    Collections.Projects.insert(projectinfo,(error) =>{
      if (error){
        alert(error);
      }
      this.props.history.replaceState(null, '/user');
    });

  }
});
