const {
  Dialog,
  FlatButton,
  TextField,
  RadioButtonGroup,
  RadioButton
  } = MUI;

PersonalInfo = React.createClass({
  propTypes: {
    open: React.PropTypes.bool
  },
  render(){
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
      wrap: {
        display: 'flex',
        WebkitFlexDirection: 'column',
        margin: '0 auto',
        width: '18rem'
      }
    };
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="确认"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
      />
    ];
    return (
      <Dialog
        title="完善个人资料"
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.handleClose}>
        <div style={styles.wrap}>
          <TextField
            ref="name"
            floatingLabelText="真实姓名"
          /><br/>
          <RadioButtonGroup ref="sex" name="sexSelected">
            <RadioButton
              value="female"
              label="女"
              style={styles.radioButton}
            />
            <RadioButton
              value="male"
              label="男"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <TextField
            ref="major"
            hintText="格式[软件工程]"
            floatingLabelText="主修专业"
          /><br/>
          <TextField
            ref="grade"
            hintText="格式[13级]"
            floatingLabelText="所在年级"
          /><br/>
          <TextField
            ref="skill"
            hintText="请根据自己真实情况"
            floatingLabelText="自我擅长技能/能力/优势描述"
            multiLine={true}
            rows={2}
          />
        </div>
      </Dialog>
    )
  },
  onSubmit(){
    let person = {}
    person.userID = Meteor.userId();
    person.name = this.refs.name.getValue().trim();
    person.sex = this.refs.sex.getSelectedValue();
    person.major = this.refs.major.getValue().trim();
    person.grade = this.refs.grade.getValue().trim();
    person.skill = this.refs.skill.getValue().trim();
    try {
      Collections.Person.insert(person);
      this.props.handleClose();
    }catch (e){
      alert(e);
    }
  }
});
