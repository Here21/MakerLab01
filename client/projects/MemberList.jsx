const {
  TextField
  } = MUI;
const Colors = MUI.Styles.Colors;
MemberList = React.createClass({
  mixins:[ReactMeteorData],
  getInitialState(){
    return {
      username:'',
      underlineColor:""
    }
  },
  getMeteorData(){
    Meteor.subscribe("findNumber",this.state.username);
    return {
      users:Meteor.users.find().fetch()
    }
  },
  render(){
    let numbers = [];
    for (let i = 1; i<this.props.memberCount;i++){
      numbers.push(
        <TextField
          key={i}
          ref={"mumber_"+i}
          hintText="成员账号"
          underlineFocusStyle={{borderColor: this.state.underlineColor}}
          onChange={this.checkNumber}
          floatingLabelText="团队成员"/>)
    }
    return(
      <div style={{display:'flex',WebkitFlexDirection:'column'}}>
        {numbers}
      </div>
    )
  },
  checkNumber(event){
    let username = event.target.value;
    this.setState({
      username:username
    });
    if (username === Meteor.user().username || this.data.users.length > 1){
      this.setState({
        underlineColor:Colors.green500
      });
      this.props.getMembers(this.state.username);
    }else {
      this.setState({
        underlineColor:Colors.amber900
      })
    }
  }
});