import { Meteor } from 'meteor/meteor';

//Collections
import { GraduationCourses } from '../imports/api/graduation_courses.js';
import { Classes } from '../imports/api/classes.js';
import { Professors } from '../imports/api/professors.js';
import { Ranking } from '../imports/api/ranking.js';

//Publishs
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
  service: "facebook",
  appId: '768369383349097', //Production
  secret: '06492eb705ba5b4c517344cc96bc412b' //Production
  //appId: '819922718188533', //Test
  //secret: 'cdee391b96d5b222a75339ea8ff62dd7' //Test
});
