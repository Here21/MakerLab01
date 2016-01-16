PostContent = React.createClass({
    getInitialState(){
        return {
            projectData:{}
        }
    },
    componentWillMount(){
        this.setState({
            projectData : this.props.content
        })
        console.log(this.state.projectData)
    },
    render(){
        let styles = {
            root:{
                margin:' 1rem auto',
                padding: '2rem',
                maxWidth: '45rem'
            }
        };
        return (
            <div style={styles.root}>
                {this.state.projectData[0].projectInfo.projectbrief}
            </div>
        );
    }
})