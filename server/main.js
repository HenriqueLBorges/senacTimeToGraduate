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
  return Classes.find({});
});

Meteor.publish('ranking', function (id) {
  return Ranking.find({ "course": id });
});

Meteor.methods({
  'addNewRankingItem': function (item) {

    let date = new Date();
    date = moment(date).format('DD-MM-YYYY HH:mm:ss');
    console.log('date = ', date);
    
    Ranking.insert({
      'course': item.course,
      'name': item.name,
      'classes': item.classes,
      'remainingClasses': item.remainingClasses,
      'remainingHours': item.remainingHours,
      'percentage': item.percentage,
      'date': date
    });
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
  appId: '768369383349097',
  secret: '06492eb705ba5b4c517344cc96bc412b'
});
