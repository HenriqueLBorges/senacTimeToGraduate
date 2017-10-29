import { Meteor } from 'meteor/meteor';

//Collections
import { GraduationCourses } from '../imports/api/graduation_courses.js';
import { Classes } from '../imports/api/classes.js';

//Publishs
Meteor.publish('graduation_courses', function () {
  return GraduationCourses.find({});
});

Meteor.publish('classes', function (id) {
  /*console.log('id = ', id)
  console.log("publish classes = ", Classes.find({'course_ids': id}).fetch());*/
  return Classes.find({'course_ids': id});
});

Meteor.startup(() => {
  // code to run on server at startup
});
