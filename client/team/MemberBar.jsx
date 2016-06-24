MemberBar = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData(){
    Meteor.subscribe('members',this.props.members);
    return {
      members: Meteor.users.find().fetch()
    }
  },
  render() {
    let items;
    items = this.data.members.map((item) => {
      return <MemberCard key={item._id} item={item} />
    });

    return (
      <div className="member-bar"
           style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50rem',
            margin: '2.5rem auto',
            justifyContent: 'flex-start'
          }}
      >
        <h1 style={{color: 'grey',fontStyle: 'oblique',fontWeight: 400}}>团队成员</h1>
        <div
          style={{
            display: 'flex',
            width: '50rem',
            margin: '2.5rem auto',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
        >
          {items}
        </div>
      </div>
    )

  }
});
