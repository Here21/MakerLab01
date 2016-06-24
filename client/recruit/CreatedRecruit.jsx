const {
  DropDownMenu,
  MenuItem,
  TextField,
  FlatButton,
  Paper
} = MUI;

const {SvgIcons} = MUI.Libs;
const Colors = MUI.Styles.Colors;

CreatedRecruit = React.createClass({
  mixins: [ReactMeteorData,ReactRouter.History],
  getMeteorData(){
    let id = Meteor.userId();
    Meteor.subscribe('checkTeam', id);
    let isCaptain = Collections.Team.find({captain: id}).fetch();
    return {
      team: isCaptain
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
          <TextField
            ref="title"
            floatingLabelText="招募标题"/>
          <TextField
            ref="position"
            floatingLabelText="招募职位"/>
          <TextField
            ref="benefit"
            floatingLabelText="薪资/福利"/>
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
    );
  },
  // TODO:onCancel function has not created
  onSubmit(){
    let recruitInfo = {};
    recruitInfo.authorId = Meteor.userId();
    recruitInfo.projectId = this.props.params.projectId;
    recruitInfo.title = this.refs.title.getValue();
    recruitInfo.benefit = this.refs.benefit.getValue();
    recruitInfo.position = this.refs.position.getValue();
    recruitInfo.state = 'on';
    recruitInfo.description = this.refs.textarea.value;
    recruitInfo.createdTime = new Date();
    Collections.Recruit.insert(recruitInfo, (error) => {
      if (error) {
        alert(error);
      }
      this.props.history.replaceState(null, '/user');
    });

  }
});
