const ITEMS_PER_PAGE = 16;
Recruit = React.createClass({
  mixins:[ReactMeteorData],
  getInitialState() {
    return {
      search: '',
      showItemDialog: false,
      snacks: null,
      itemsLimit: ITEMS_PER_PAGE,
      category: ''
    };
  },
  getMeteorData(){
    let selector = {};
    if (this.state.search) selector.name = {$regex: '.*' + this.state.search + '.*'};
    if (this.state.category !== '') selector.category = this.state.category;
    let options = {limit: this.state.itemsLimit, sort: {createdAt: -1}};
    Meteor.subscribe('recruits', selector, options);
    let items = Collections.Recruit.find(selector, options).fetch();
    return {
      items: items,
      itemsCount: Collections.Recruit.find().count()
    };
  },
  getCategorySelected(category) {
    let temp = category;
    if (category === '全部分类') {
      temp = '';
    }
    this.setState({
      category: temp,
      itemsLimit: ITEMS_PER_PAGE,
    });
    window.scrollTo(0, 0);
  },
  onChangeSearch(value) {
    this.setState({search: value});
  },
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
    const items =this.data.items.map((item) => {
      return (
        <RecruitDisplayCard key={item._id} item={item}/>
      );
    });

    return (
      <div style={styles.root}>
        <div style={styles.hero}>
          <div style={styles.title}>招募都在这里</div>
          <SearchBar
            getCategorySelected={this.getCategorySelected}
            input={this.state.search}
            onChange={this.onChangeSearch}
            type="recruit"
          />
        </div>
        <div style={{display: 'flex',flexWrap: 'wrap',width: '60rem',margin: '1rem auto',minHeight: '80vh'}}>
          { items }
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
  },
});