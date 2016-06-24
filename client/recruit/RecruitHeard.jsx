RecruitHeard = React.createClass({
  render() {
    let styles = {
      wrap: {
        width: '45rem',
        margin: '0 auto',
        padding: '2rem',
        marginTop: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#777'
      },
      position: {
        color: '#e6775c'
      }
    }
    return (
      <div style={styles.wrap}>
        <h1>{this.props.item.title}</h1>
        {
          this.props.project !== undefined ? <p>{'项目:' + this.props.project.name}</p> : ''
        }
        <h2 style={styles.position}>{this.props.item.position}</h2>
        <p>{'薪资/福利:' + this.props.item.benefit}</p>
      </div>
    )
  }
});
