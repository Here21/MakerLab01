Join = React.createClass({
  render(){
    let styles = {
      wrap:{
        textAlign: 'center'
      },
      img: {
        width: '50rem'
      }

    };
    return (
      <div style={styles.wrap}>
        <h1 style={{marginTop:'10rem'}}>1、注册</h1>
        <img style={styles.img} src="explainImages/注册.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>2、用户页</h1>
        <img style={styles.img} src="explainImages/用户页_meitu_2.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>3、团队检测</h1>
        <img style={styles.img} src="explainImages/团队检测_meitu_3.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>4、创建团队</h1>
        <img style={styles.img} src="explainImages/创建团队_meitu_4.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>5、添加成员</h1>
        <img style={styles.img} src="explainImages/添加成员_meitu_5.jpg" alt=""/>
        <img style={styles.img} src="explainImages/确认添加_meitu_6.jpg" alt=""/>
        <img style={styles.img} src="explainImages/完成创建_meitu_7.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>6、我的团队</h1>
        <img style={styles.img} src="explainImages/我的团队_meitu_8.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>7、创建项目</h1>
        <img style={styles.img} src="explainImages/创建项目_meitu_9.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>8、选择团队</h1>
        <img style={styles.img} src="explainImages/选择团队_meitu_10.jpg" alt=""/>

        <h1 style={{marginTop:'10rem'}}>9、完成</h1>
        <img style={styles.img} src="explainImages/完成创建项目_meitu_11.jpg" alt=""/>
        
      </div>
    )
  }
});
