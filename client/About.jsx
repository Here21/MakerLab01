const { RaisedButton } = mui;

About = React.createClass({
  render() {
    let styles = {
      label: {
        fontSize: '16px'
      }
    };
    return (
      <div className="about">
        <div className="container clearfix">
          <div className="story">
            <h3>个人信息</h3>
            <div className="desc">
              web 开发者，Martin。
            </div>
            <a href="https://github.com/Martin-zhz1994">
              <RaisedButton label="I'm here" secondary={true} labelStyle={styles.label}/>
            </a>
          </div>
          <div className="paper">
            <img src="images/Martin.jpg" />
          </div>
          <div className="info">
            <h3>联系方式</h3>
            <ul>
              <li>
                <span>姓名：</span> Martin
              </li>
              <li>
                <span>邮箱：</span> deletetmr@gmail.com
              </li>
              <li>
                <span>微信：</span> delete8900
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});