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
        {
          this.props.type === 'project' ?
        <DropDownMenu value={this.state.value} rer="category" onChange={this.onMenuHandleChange}>
          <MenuItem value="全部分类" primaryText="全部分类"/>
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
        </DropDownMenu> : ''
        }
      </div>
    );
  }
});
