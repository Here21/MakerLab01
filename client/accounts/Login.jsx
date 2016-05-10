
Login = React.createClass({
  getInitialState(){
    return {
      onPage: 'login'
    }
  },
  render(){
    const styles={
      content:{
        minHeight: '90vh',
        padding: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      form:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    };
    return (
      <div style={styles.content}>
        {
          this.state.onPage === 'login' ? <LoginPage onChange={this.onChangeState} styles={styles.form} /> : <RegisterPage onChange={this.onChangeState} styles={styles.form} />
        }
      </div>
    );
  },
  onChangeState(value){
    this.setState({
      onPage:value
    })
  }

});
