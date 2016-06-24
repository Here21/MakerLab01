CategoryMenu = React.createClass({
  propTypes: {
    onSelectCategory: React.PropTypes.func
  },
  changeCategory(value) {
    this.props.onSelectCategory(value);
  },
  changeSort(value) {
    this.props.onSelectSort(value);
  },
  changeDepartment(value) {
    this.props.onSelectDepartment(value);
  },
  render() {
    const styles = {
      wrap: {
        top: '2.5rem',
        fontSize: '1rem',
        width: '70rem',
        margin: '0 auto'
      },
      ul: {
        listStyle: 'none',
        margin: '0 auto',
        padding: '0',
        top: '2.5rem',
        width: '60rem',
        overflow: 'hidden'
      },
      li: {
        boxSizing: 'border-box',
        color: '#FFF',
        textAlign: 'center',
        float: 'left',
        margin: '.5rem',
        padding: '.5rem',
        cursor: 'pointer'
      }
    };
    return (
      <div style={styles.wrap}>
        {
          this.props.projectPage ?
            <TabsControl parentStyle={styles.ul} childrenStyle={styles.li} changeCategory={this.changeCategory}>
              <li name="全部" />
              <li name="电商" />
              <li name="O2O" />
              <li name="互联网金融" />
              <li name="企业服务" />
              <li name="汽车服务" />
              <li name="医疗健康" />
              <li name="社交" />
              <li name="在线教育" />
              <li name="房产服务" />
              <li name="在线旅游" />
              <li name="硬件" />
              <li name="游戏" />
              <li name="广告营销" />
              <li name="文化体育娱乐" />
            </TabsControl> : ''
        }
        {
          this.props.projectPage ? 
            <TabsControl parentStyle={styles.ul} childrenStyle={styles.li} changeCategory={this.changeSort}>
              <li name="全部" />
              <li name="创新创业" />
              <li name="学科竞赛" />
              <li name="课程项目" />
            </TabsControl> : ''
        }
        <TabsControl parentStyle={styles.ul} childrenStyle={styles.li} changeCategory={this.changeDepartment}>
          <li name="全部" />
          <li name="计算机科学与技术系" />
          <li name="软件工程系" />
          <li name="数字艺术系" />
          <li name="电子工程系" />
          <li name="信息管理系" />
          <li name="商务管理系" />
          <li name="英语系" />
          <li name="日语系" />
          <li name="俄语系" />
          <li name="继续教育学院" />
        </TabsControl>
      </div>
    );
  }
});
