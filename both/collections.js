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
    label:"项目描述",
    max:30
  },
  description:{
    type:String,
    label:"项目描述"
  },
  team:{
    type:String,
    label:"团队ID"
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