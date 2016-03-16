const { RaisedButton } = MUI;
const { Link } = ReactRouter;

Home = React.createClass({
    getName(){
        return Meteor.user().username;
    },
    hasLogin(){
        return Meteor.user() ? this.getName() : 'MakerLab';
    },
    render() {
        return (
            <div className="home">
                <div className="overlay">
                    <div className="inner">
                        <div className="content">
                            <h1 className="title">
                                hi! i&#39;m
                                <span className="name">{this.hasLogin()}</span>
                            </h1>
                            <h2 className="subtitle">
                                MakerLab  一个虚拟移动实验室
                            </h2>
                            {/*
                                <Link to="/">
                                    <RaisedButton label="Create a project" secondary={true}/>
                                </Link>
                            */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});