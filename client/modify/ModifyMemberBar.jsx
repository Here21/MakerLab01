const Colors = MUI.Styles.Colors;
ModifyMemberBar = React.createClass({
  mixins:[ReactMeteorData],
  getDefaultProps() {
    return {
      initDisabled: false
    };
  },
  getInitialState(){
    return {
      username:'',
      disabled:this.props.initDisabled
    }
  },
  // TODO:将this.props.members赋值给state，然后添加成员或者删除成员就可以看到成员卡片变动。确认以后返回给父组件去修改数据库的值。
  getMeteorData(){
    Meteor.subscribe('members',this.props.members);
    Meteor.subscribe("findNumber",this.state.username);
    let user = Meteor.users.findOne({username:this.state.username});
    return {
      members: Meteor.users.find().fetch(),
      users:user
    }
  },
  onMemberChange(members){
    let temp = [];
    for (let item of members){
      temp.push(item);
    }
    Collections.Team.update({_id: this.props.id},{$set: {member: temp}}, (error) => {
      if (error) {
        alert(error)
      }
      alert('更改成员成功');
    });
  },
  deleteMember(member){
    this.state.members.delete(member);
    this.onMemberChange(this.state.members);
  },
  componentWillMount(){
    this.setState({
      members: new Set(this.props.members)
    });
  },
  getMembers(value){
    this.state.members.add(value);
  },
  render() {
    let items;
    items = this.data.members.map((item) => {
      return <ModifyMemberCard key={item._id} item={item} captain={this.props.captain} deleteMember={this.deleteMember}/>
    });
    return (
      <div
        className="member-bar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50rem',
          margin: '2.5rem auto',
          justifyContent: 'flex-start'
        }}
      >
        <h1 style={{color: 'grey',fontStyle: 'oblique',fontWeight: 400}}>团队成员</h1>
        <TextButton
          changeColor={this.changeColor}
          checkNumber={this.checkNumber}
          confirmToAdd={this.confirmToAdd}
          disabled={this.changeDisabledState()}
        />
        <div
          style={{
            display: 'flex',
            width: '50rem',
            margin: '2.5rem auto',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
        >
          {items}
        </div>
      </div>
    )
  },
  changeDisabledState(){
    return this.data.users !== undefined ? false : true;
  },
  changeColor(){
    if(this.data.users !== undefined){
      return Colors.green500
    }
    return Colors.amber900
  },
  checkNumber(event){
    this.setState({
      username: event.target.value
    })
  },
  confirmToAdd(){
    this.state.members.add(this.state.username);
    this.onMemberChange(this.state.members);
    //this.props.getMembers(this.data.users.username);
    //this.onMemberChange()
  }
});
