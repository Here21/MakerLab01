/**
 * Created by martin on 16-3-4.
 */
Collections = {};

Collections.Person = new Mongo.Collection("person");
Collections.Person.attachSchema(new SimpleSchema({
  userID: {
    type: String,
    label: "userID",
    max: 30
  },
  name: {
    type: String,
    label: "用户姓名",
    max:20
  },
  sex: {
    type: String,
    label: "性别",
    max:6
  },
  major: {
    type: String,
    label: "专业",
    max:50
  },
  grade: {
    type: String,
    label: "年级",
    max:30
  },
  skill: {
    type:String,
    label:"技能擅长"
  }
}));

Collections.Projects = new Mongo.Collection("projects");
Collections.Projects.attachSchema(new SimpleSchema({
  authorId:{
    type:String,
    label:"发布者",
    max:30
  },
  name:{
    type:String,
    label:"项目名称",
    max:50
  },
  category:{
    type:String,
    label:"项目类型",
    max:15
  },
  brief:{
    type:String,
    label:"项目简述",
    max:30
  },
  description:{
    type:String,
    label:"项目描述"
  },
  sort:{
    type:String,
    label:"项目分类"
  },
  team:{
    type:String,
    label:"团队ID"
  },
  department:{
    type:String,
    label:'系别'
  },
  state:{
    type:String,
    label:"状态",
    max:6
  },
  imageFile:{
    type:[String],
    label:"项目文件",
    optional: true
  },
  createdAt:{
    type:Date,
    label:"创建时间",
    max:50
  }
}));
// TODO:createdAt sort.department to sort
Collections.Team = new Mongo.Collection("team");
Collections.Team.attachSchema(new SimpleSchema({
  captain:{
    type:String,
    label:"队长",
    max:30
  },
  name:{
    type:String,
    label:"团队名称",
    max:50
  },
  brief:{
    type:String,
    label:"项目描述",
    max:30
  },
  description:{
    type:String,
    label:"项目描述"
  },
  member:{
    type:[String],
    label:"团队ID",
    minCount:1
  },
  createdAt:{
    type:Date,
    label:"创建时间",
    max:50
  }
}));
// TODO:created sort
Collections.Recruit = new Mongo.Collection("recruit");
Collections.Recruit.attachSchema(new SimpleSchema({
  authorId:{
    type:String,
    label:"发布者",
    max:30
  },
  title:{
    type:String,
    label:"招募标题",
    max:50
  },
  position:{
    type:String,
    label:"招募职位",
    max:15
  },
  benefit:{
    type:String,
    label:"薪资福利"
  },
  description:{
    type:String,
    label:"招募描述"
  },
  projectId:{
    type:String,
    label:"项目名称"
  },
  state:{
    type:String,
    label:"状态",
    max:6
  },
  createdAt:{
    type:Date,
    label:"创建时间",
    max:50
  }
}));
//
// Collections.ProjectImages = new FS.Collection('project-image', {
//   stores: [
//     new FS.Store.FileSystem('project-image', {
//       path: `/opt/cfs/project`,
//       transformWrite: function(fileObj, readStream, writeStream) {
//         gm(readStream).resize(600).stream('jpg').pipe(writeStream);
//       }
//     })
//   ],
//   filter: {
//     maxSize: 1920 * 1680,
//     allow: {
//       contentTypes: ['image/*']
//     },
//     onInvalid: function (message) {
//       if (Meteor.isClient) {
//         alert(message);
//       } else {
//         console.log(message);
//       }
//     }
//   }
// });