const { TextField } = mui;

SearchBar = React.createClass({
  getStyles() {
    return {
      svg: {
        fill: '#fff',
        position: 'absolute',
        top: '24px',
        left: '12px'
      },
      div: {
        width: '48px',
        height: '48px',
        display: 'inline-block',
        position: 'relative',
        marginBottom: '-12px'
      }
    };
  },

  handleChange() {
    this.props.onUserInput(
      this.refs.searchInput.getValue().trim()
    );
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <div style={styles.div}>
          <SearchIcon style={styles.svg} />
        </div>
        <TextField
          ref="searchInput"
          value={this.props.inputText}
          style={styles.textField}
          underlineStyle={{borderColor: "#ccc"}}
          underlineFocusStyle={{borderColor: "#fff"}}
          hintText="搜索"
          hintStyle={{ color: '#fff' }}
          inputStyle={{ color: '#fff' }}
          onChange={this.handleChange} />
      </div>
    );
  }
})