const ITEMS_PER_PAGE = 16;
Project = React.createClass({
  mixins:[ReactMeteorData],
  getInitialState() {
    return {
      search: '',
      showItemDialog: false,
      snacks: null,
      itemsLimit: ITEMS_PER_PAGE,
      category: '',
      sort: '',
      department: '',
      minDate: '',
      maxDate: ''
    };
  },
  getMeteorData(){
    let selector = {};
    selector.state = 'open';
    if (this.state.search) selector.name = {$regex: '.*' + this.state.search + '.*'};
    if (this.state.category !== '') selector.category = this.state.category;
    if (this.state.sort !== '') selector.sort = this.state.sort;
    if (this.state.department !== '') selector.department = this.state.department;
    if (this.state.minDate !== '' && this.state.maxDate !== '') {
      selector.createdAt = {
        $gte: moment(this.state.minDate).startOf('day').toDate(),
          $lte: moment(this.state.maxDate).endOf('day').toDate()
      }
    }
    // TODO:排序，按时间倒序
    let options = {limit: this.state.itemsLimit, sort: {createdAt: -1}};
    Meteor.subscribe('projects', selector, options);
    let projects = Collections.Projects.find(selector, options).fetch();
    return {
      projects:projects,
      itemsCount: Collections.Projects.find().count()
    };
  },
  handleChangeMinDate (date) {
    this.setState({
      minDate: date
    });
  },

  handleChangeMaxDate (date) {
    this.setState({
      maxDate: date
    });
  },
  onSelectCategory(category) {
    let temp = category;
    if (category === '全部') {
      temp = '';
    }
    this.setState({
      category: temp,
      itemsLimit: ITEMS_PER_PAGE,
    });
    window.scrollTo(0, 0);
  },
  onSelectSort(sort) {
    let temp = sort;
    if (sort === '全部') {
      temp = '';
    }
    this.setState({
      sort: temp,
      itemsLimit: ITEMS_PER_PAGE,
    });
    window.scrollTo(0, 0);
  },
  onSelectDepartment(department) {
    let temp = department;
    if (department === '全部') {
      temp = '';
    }
    this.setState({
      department: temp,
      itemsLimit: ITEMS_PER_PAGE,
    });
    window.scrollTo(0, 0);
  },
  onChangeSearch(value) {
    this.setState({search: value});
  },
  // componentDidMount(){
  //   $(".loader").delay(600).fadeOut('slow',function(){
  //     $(".blog-list").fadeIn('slow');
  //   })
  // },

  render() {
    let styles={
      root:{
        paddingTop:'64px',
        backgroundColor:'#fafafa',
        minHeight:'50em'
      },
      hero:{
        backgroundColor:'#03A9F4',
        textAlign:'center',
        paddingTop:'55px',
        paddingBottom:'55px',
        marginBottom:'30px'
      },
      title:{
        fontSize:'48px',
        color:'#fff',
        marginBottom:'20px',
        lineHeight:1.1
      },
      circle:{
        margin:'0 auto',
        paddingTop:'100px',
        display:'block'
      }
    };
    const projectItems =this.data.projects.map((project) => {
      return (
        <ProjectDisplayCard key={project._id} item={project}/>
      );
    });

    return (
      <div style={styles.root}>
        <div style={styles.hero}>
          <div style={styles.title}>项目都在这里</div>
          <SearchBar
            input={this.state.search}
            onChange={this.onChangeSearch}
            type="project"
          />
          <DatePickerBar
            handleChangeMinDate={this.handleChangeMinDate}
            handleChangeMaxDate={this.handleChangeMaxDate}
          />
          <CategoryMenu
            projectPage={true}
            onSelectSort={this.onSelectSort}
            onSelectDepartment={this.onSelectDepartment}
            onSelectCategory={this.onSelectCategory}/>
        </div>
        <div style={{display: 'flex',flexWrap: 'wrap',width: '60rem',margin: '1rem auto',minHeight: '80vh'}}>
          { projectItems }
        </div>
        { // If, once the subscription is ready, we have less rows than we asked for, we've got all the rows in the collection.
          this.data.itemsCount < this.state.itemsLimit ? '' :
            <VisibilitySensor onChange={this.onShowMoreVisibilityChanged}>
              <div>正在加载中...</div>
            </VisibilitySensor>
        }
        <BackToTop>⇧</BackToTop>
      </div>
    );
  },
  onShowMoreVisibilityChanged(isVisible) {
    if (isVisible) this.setState({itemsLimit: this.state.itemsLimit + ITEMS_PER_PAGE});
  }
});