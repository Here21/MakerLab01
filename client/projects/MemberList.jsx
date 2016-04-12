const {
  TextField,
  IconButton
  } = MUI;
const Colors = MUI.Styles.Colors;
const {SvgIcons} = MUI.Libs;

MemberList = React.createClass({
  mixins:[ReactMeteorData],
  getInitialState(){
    return {
      username:'',
      disabled:true
    }
  },
  getMeteorData(){  
    Meteor.subscribe("findNumber",this.state.username);
    let user = Meteor.users.findOne({username:this.state.username});
    return {
      users:user
    }
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
    this.props.getMembers(this.data.users.username);
  },
  render(){
    let numbers = [];
    for (let i = 1; i<this.props.memberCount;i++){
      numbers.push(
        <TextButton key={i} changeColor={this.changeColor} checkNumber={this.checkNumber} confirmToAdd={this.confirmToAdd}/>
      )
    }
    return(
      <div style={{display:'flex',WebkitFlexDirection:'column'}}>
        {numbers}
      </div>
    )
  }
});
