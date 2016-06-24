const {
  Dialog,
  FlatButton,
  RaisedButton
} = MUI;
SelectTeam = React.createClass({
  getInitialState(){
    return{
      open:false
    }
  },
  handleOpen(){
    this.setState({open: true});
  },
  handleClose() {
    this.setState({open: false});
  },
  onChangeTeam(value){
    this.props.selectTeam(value);
  },
  render() {
    let items = this.props.items.map(item => {
      return (
        <SelectTeamCard
          key={item._id}
          item={item}
          onChangeTeam={this.onChangeTeam}
          handleClose={this.handleClose}
        />
      )
    })
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose} />
    ];
    return (
      <div style={{margin: '2rem'}}>
        <RaisedButton label="选择团队" primary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title="选择团队"
          actions={actions}
          modal={true}
          open={this.state.open}>
          <span style={{fontStyle: 'italic',fontSize: '12px',color: '#212121'}}>点击下方的团队卡片，然后关闭即可</span>
          {
            items
          }
        </Dialog>
      </div>
    );
  }
});
