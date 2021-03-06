const {
  TextField,
  IconButton
} = MUI;
const {SvgIcons} = MUI.Libs;
const Colors = MUI.Styles.Colors;
TextButton = React.createClass({
  getInitialState(){
    return {
      disabled:true
    }
  },
  // TODO:replace the svgIcon and add disable attr
  render(){
    // console.log(this.props.disabled);
    return(
      <div>
        <TextField
          hintText="成员账号"
          ref="member"
          underlineFocusStyle={{borderColor:this.props.changeColor()}}
          onChange={this.props.checkNumber}
          floatingLabelText="团队成员"/>
        <IconButton
          tooltip="确认添加"
          tooltipPosition="top-center"
          disabled={this.props.disabled}
          onClick={this.props.confirmToAdd}>
          <SvgIcons.ActionDone color={Colors.lightBlue700}/>
        </IconButton>
      </div>
    )
  }
});
