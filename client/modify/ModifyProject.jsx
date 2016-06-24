const {
  DropDownMenu,
  MenuItem,
  TextField,
  FlatButton,
  Paper
} = MUI;

const {SvgIcons} = MUI.Libs;
const Colors = MUI.Styles.Colors;

ModifyProject = React.createClass({
  mixins: [ReactMeteorData,ReactRouter.History],
  getInitialState(){
    return {
      value: '',
      team:undefined
    }
  },
  getMeteorData(){
    let id = this.props.params.projectId;
    Meteor.subscribe('projectPost', id);
    let post = Collections.Projects.findOne({_id: id});
    // console.log(post);
    // let image = post.imageFile;
    // // console.log(image);
    // Meteor.subscribe('image', image);
    // let files = Collections.ProjectImages.find().fetch();
    // console.log(files[0].url({store: 'project-image'}));
    return {
      post: post
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
    this.editor.setValue(this.data.post.description);
    this.setState({
      value: this.data.post.category
    });
  },

  // TODO:调整样式，间距和颜色，还有添加成员按钮
  render(){
    let name;
    let brief;
    if (this.data.post !== undefined){
      // this.editor.setValue(this.data.post.description);
      name =  <TextField
                ref="name"
                defaultValue={this.data.post.name}
                floatingLabelText="项目名称"/>
      brief = <TextField
                style={{margin:'2rem'}}
                ref="brief"
                defaultValue={this.data.post.brief}
                hintText="请控制在30字以内"
                onChange={this.checkTextLength}
                floatingLabelText="项目简述"/>
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
    let actions = [
      <FlatButton
        label="创建团队"
        primary={true}
        onTouchTap={this.gotoCreateTeam}/>,
    ];
    return (
      <div style={styles.wrap}>
        <form style={styles.form} onSubmit={this.onSubmit}>
          {
            name
          }
          <DropDownMenu value={this.state.value} rer="category" onChange={this.handleChange}>
            <MenuItem value={"电商"} primaryText="电商"/>
            <MenuItem value={"O2O"} primaryText="O2O"/>
            <MenuItem value={"互联网金融"} primaryText="互联网金融"/>
            <MenuItem value={"企业服务"} primaryText="企业服务"/>
            <MenuItem value={"汽车服务"} primaryText="汽车服务"/>
            <MenuItem value={"医疗健康"} primaryText="医疗健康"/>
            <MenuItem value={"社交"} primaryText="社交"/>
            <MenuItem value={"在线教育"} primaryText="在线教育"/>
            <MenuItem value={"房产服务"} primaryText="房产服务"/>
            <MenuItem value={"在线旅游"} primaryText="在线旅游"/>
            <MenuItem value={"硬件"} primaryText="硬件"/>
            <MenuItem value={"游戏"} primaryText="游戏"/>
            <MenuItem value={"广告营销"} primaryText="广告营销"/>
            <MenuItem value={"文化体育娱乐"} primaryText="文化体育娱乐"/>
          </DropDownMenu>
          {
            brief
          }
          <textarea ref='textarea' rows="50"/>
        </form>
        {/*
        <Paper style={styles.paper} zDepth={this.state.zDepth}>
          <h1 style={{margin: '0',color: '#03a9f4',overflowWrap: 'break-word'}}>{this.data.team.name}</h1>
          <p style={{margin: '0',color: '#525457'}}>{'团队人数' + this.data.team.member}</p>
        </Paper>
        */}
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
  
  onCancel(){
    this.history.pushState(null, '/user')
  },
  onSubmit(){
    let projectinfo = {};
    projectinfo.authorId = Meteor.userId();
    projectinfo.name = this.refs.name.getValue();
    projectinfo.category = this.state.value;
    projectinfo.brief = this.refs.brief.getValue();
    projectinfo.description = this.refs.textarea.value;
    
    Collections.Projects.update({_id: this.data.post._id},{$set: projectinfo}, (error) => {
      if (error) {
        alert(error)
      }
      this.history.pushState(null, '/user')
    });
  }
});
