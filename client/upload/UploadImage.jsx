const {
  FlatButton
} = MUI;
UploadImage = React.createClass({
  render() {
    let styles = {
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
      }
    };
    return (
      <div>
        <FlatButton label="上传图片" labelPosition="before">
          <input type="file" style={styles.exampleImageInput} onChange={this.upLoadImages} multiple/>
        </FlatButton>
      </div>
    );
  },
  upLoadImages(e){
    e.preventDefault();
    let that = this;
    let imageFile=[];
    FS.Utility.eachFile(e, function(file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        that.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };
      let buffer;
      let bufferType;
      try {
        buffer = file;
        console.log(buffer);
        bufferType = 'image/*';
      } catch (e) {
        console.log(e);
      }
      let newFile = new FS.File();
      newFile.attachData(buffer, {type: bufferType});
      newFile.name('test.jpg');
      let doc = Collections.ProjectImages.insert(newFile);
      imageFile.push(doc._id);
    });
    this.props.insertImage(imageFile);
  }
});
