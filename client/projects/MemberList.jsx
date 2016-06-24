const Colors = MUI.Styles.Colors;

MemberList = React.createClass({
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
  getMeteorData(){  
    Meteor.subscribe("findNumber",this.state.username);
    let user = Meteor.users.findOne({username:this.state.username});
    
    return {
      users:user
    }
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
    this.props.getMembers(this.data.users.username);
  },
  render(){
    let numbers = [];
    for (let i = 1; i<this.props.memberCount;i++){
      numbers.push(
        <TextButton
          key={i}
          changeColor={this.changeColor}
          checkNumber={this.checkNumber}
          confirmToAdd={this.confirmToAdd}
          disabled={this.changeDisabledState()}
        />
      )
    }
    return(
      <div style={{display:'flex',WebkitFlexDirection:'column'}}>
        {numbers}
      </div>
    )
  }
});
