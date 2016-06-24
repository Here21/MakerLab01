const {
  TextField,
  IconButton
} = MUI;

const {SvgIcons} = MUI.Libs;

const Colors = MUI.Styles.Colors;

SearchBar = React.createClass({
  propTypes: {
    input: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      input: this.props.input
    };
  },
  onSubmit(event) {
    event.preventDefault();
    this.props.onChange(this.state.input);
  },
  onCancel() {
    this.setState({input: ''});
    if (this.props.input !== '') {
      this.props.onChange('');
    }
  },
  setCurrentValue(event) {
    this.setState({input: event.target.value});
  },
  handleDayClick(e, day) {
    //this.setState({ selectedDay: day });
    console.log(day)
  },
  render() {
    return (
      <div>
        <form style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}} onSubmit={this.onSubmit}>
          <div>
            <TextField
              style={{width: '10rem'}}
              hintText='搜索'
              hintStyle={{color: Colors.white}}
              value={this.state.input}
              onChange={this.setCurrentValue}
            />
          </div>
          {
            this.state.input !== '' ?
              <SvgIcons.ContentClear
                onClick={this.onCancel}
              /> : ''
          }
          <IconButton type='submit'>
            <SvgIcons.ActionSearch />
          </IconButton>
        </form>
       
      </div>
    );
  }
});
