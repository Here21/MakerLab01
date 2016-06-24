const {
  DatePicker
} = MUI;
DatePickerBar = React.createClass({
  getInitialState(){
    return{
      minDate: new Date(),
      maxDate: new Date()
    }
  },
  handleChangeMinDate (event, date) {
    console.log(date);
    this.props.handleChangeMinDate(date);
  },

  handleChangeMaxDate (event, date) {
    console.log(date);
    this.props.handleChangeMaxDate(date);
  },
  render() {
    return (
      <div>
        <DatePicker
          onChange={this.handleChangeMinDate}
          autoOk
          floatingLabelText="最小查询年份"
        />
        <DatePicker
          onChange={this.handleChangeMaxDate}
          autoOk
          floatingLabelText="最大查询年份"
        />
      </div>
    );
  }
});
