const {
  TextField,
  IconButton,
  DropDownMenu,
  MenuItem
} = MUI;

const {SvgIcons} = MUI.Libs;

const Colors = MUI.Styles.Colors;

SearchBar = React.createClass({
  propTypes: {
    input: React.PropTypes.string,
    getVendorSelected: React.PropTypes.func,
    onChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      input: this.props.input,
      value: '全部分类'
    };
  },
  onMenuHandleChange(vae, index, value) {
    this.setState({value: value})
    this.props.getCategorySelected(value);
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
        <DropDownMenu value={this.state.value} rer="category" onChange={this.onMenuHandleChange}>
          <MenuItem value="全部分类" primaryText="全部分类"/>
          <MenuItem value="移动互联网" primaryText="移动互联网"/>
          <MenuItem value="O2O" primaryText="O2O"/>
          <MenuItem value="软件服务" primaryText="软件服务"/>
          <MenuItem value="电子商务" primaryText="电子商务"/>
          <MenuItem value="新媒体" primaryText="新媒体"/>
          <MenuItem value="教育" primaryText="教育"/>
          <MenuItem value="游戏" primaryText="游戏"/>
          <MenuItem value="其他" primaryText="其他"/>
        </DropDownMenu>
      </div>
    );
  }
});
