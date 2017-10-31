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

    Ranking.insert({
      'course': item.course,
      'name': item.name,
      'classes': item.classes,
      'remainingClasses': item.remainingClasses,
      'remainingHours': item.remainingHours,
      'percentage': item.percentage
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
    appId: '819922718188533',
    secret: 'cdee391b96d5b222a75339ea8ff62dd7'
});
