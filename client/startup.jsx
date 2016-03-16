injectTapEventPlugin();
const {
	Router,
	Route,
	IndexRoute
} = ReactRouter;

const {
	createHistory
} = History;

const Routes = (
	// <Route path="/" component = {App}/>
	<Route path="/" component = {App}>
		<Route path="project" component={Project}/>
		<Route path ="/project/:postName" component={Post} />
		<Route path="home" component={Home}/>
		<Route path="login" component={Login}/>
		<Route path="user" component={User}/>
		<Route path="/user/:publish" component={PublicProject} />
		<IndexRoute component = {Home}/>
	</Route>
);

Meteor.startup(function(){
	ReactDOM.render((
		<Router history = {createHistory()}>
			{Routes}
		</Router>
	),document.getElementById("container"));
});

