import { Meteor } from 'meteor/meteor';

//Collections
import { GraduationCourses } from '../imports/api/graduation_courses.js';
import { Classes } from '../imports/api/classes.js';
import { Professors } from '../imports/api/professors.js';
import { Ranking } from '../imports/api/ranking.js';

/*Publishs
These functions control how Meteor servers publish sets of records and how clients can subscribe to those sets.*/
Meteor.publish('graduation_courses', function () {
  return GraduationCourses.find({});
});

Meteor.publish('classes', function (id) {
  return Classes.find({ 'course_ids': id });
});

Meteor.publish('professors', function () {
  return Professors.find({});
});

Meteor.publish('ranking', function (id) {
  return Ranking.find({ "course": id });
});

Meteor.publish('users', function () {
  return Meteor.users.find({});
});

Meteor.methods({
  'addNewRankingItem': function (item) {
    //Adds a new item to the collection ranking
    let date = new Date();
    date = moment(date).format('DD-MM-YYYY HH:mm:ss');

    Ranking.insert({
      'course': item.course,
      'userID': item.userID,
      'classes': item.classes,
      'share': item.share,
      'remainingClasses': item.remainingClasses,
      'remainingHours': item.remainingHours,
      'percentage': item.percentage,
      'date': date
    });
  },

  'getCourseRanking': function (course_id) {
    //Gets the last inserted document of each user who shared his progress in the course test.
    let ranking = [];
    let records = Ranking.aggregate(
      [
        { $match: { course: course_id, share: true } },
        { $sort: { userID: 1, date: 1 } },
        {
          $group:
          {
            _id: "$userID",
            document_id: { $last: "$_id" }
          }
        }
      ]
    );
    records.map((record, i) => {
      let obj = {
        user: Meteor.users.findOne({ "_id": record._id }),
        record: Ranking.findOne({ "_id": record.document_id })
      }
      ranking.push(obj);
    });
    return ranking;
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});

ServiceConfiguration.configurations.remove({
  service: "facebook"
});

ServiceConfiguration.configurations.insert({
  //Facebook API - Used to login with facebook
  service: "facebook",
  appId: '768369383349097', //Production
  secret: '06492eb705ba5b4c517344cc96bc412b' //Production
  //appId: '819922718188533', //Test
  //secret: 'cdee391b96d5b222a75339ea8ff62dd7' //Test
});
