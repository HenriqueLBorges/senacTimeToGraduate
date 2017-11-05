# SenacTimeToGraduate:

## About the app:
[SenacTimeToGraduate](https://senactimetograduate.herokuapp.com/) is a [Meteor](https://www.meteor.com/) app that uses [React](https://reactjs.org/), built to study these technologies. It's objective is to [Senac](http://www.sp.senac.br/jsp/default.jsp?newsID=0) students to interact with it, calculates their left time on graduation, bring together students and of course encourage them to continue their graduation courses. With this app students can also learn more about [Meteor](https://www.meteor.com/) apps, [React library](https://reactjs.org/) and [document oriented databases](https://www.mongodb.com/document-databases)

## How it works:
[SenacTimeToGraduate](https://senactimetograduate.herokuapp.com/) uses [login with Facebook](https://guide.meteor.com/accounts.html) to creates new users, these users can take completion tests on any Senac course registered, after completing the test the user can optionally share it's result on the course ranking. If the user doesn't choose to share it's progress his data remains totally private.

### Database
SenacTimeToGraduate uses [MongoDB](http://mrdoob.com/projects/code-editor/) to record data. The [collections](https://docs.mongodb.com/v3.2/core/databases-and-collections/) used in this app are described bellow.

#### Collections

###### professors
```javascript
{
	"_id" : String,
	"name" : String,
	"photo" : String,
	"email" : String,
	"cellphone" : String
}
```
* _id - holds an ObjectId
* name - professor name
* photo - photo URL
* email - Optional
* cellphone - Optional

###### graduation_courses
```javascript
{
	"_id" : String,
	"name" : String,
	"coordinator" : String,
	"objective" : String,
	"semesters" : int
}
```
* coordinator - holds an ObjectId that matchs a document in the professors collection
* semesters - total of semesters

###### classes
```javascript
{
	"_id" : String,
	"hours" : int,
	"name" : String,
	"professors" : String [ ],
	"description" : String,
	"semester" : String,
	"course_ids" : String [ ]
}
```
* hours - total of hours
* professors - it can be used to store collection professors ObjectId's (Optional).
* semester - class semester
* course_id - it stores at least one collection graduation_courses ObjectId

###### users
```javascript
{
	"_id" : String,
	"createdAt" : Date,
	"services" : {
		"facebook" : {
			"accessToken" : String,
			"expiresAt" : int,
			"id" : String,
			"email" : String,
			"name" : String,
			"first_name" : String,
			"last_name" : String,
			"link" : String,
			"gender" : String,
			"locale" : String,
			"age_range" : {
				"min" : int
			}
		},
		"resume" : {
			"loginTokens" : Object[]
		}
	},
	"profile" : {
		"name" : String
	}
}

```
The insert of an object in the collection users is done automatically after the user log into Facebook. The only field that are being used by this app are the **profile.name** and the **_id**.

###### ranking
```javascript
{
	"_id" : String,
	"course" : String,
	"userID" : String,
	"classes" : String [ ],
	"share" : Boolean,
	"remainingClasses" : String [ ],
	"remainingHours" : int,
	"percentage" : String,
	"date" : Date
}
```
* course - collection graduation_courses matching ObjectId
* userID - collection users matching ObjectId
* classes - It stores an array of collection classes ObjectId's. The classes in this array are the ones completed by the user.
* share - If true the user wants this data to be shown at the course ranking page
* remainingClasses - It stores an array of collection classes ObjectId's. The classes in this array are the ones not completed by the user
* ramainingHours - Saves the total of remaining hours
* percentage - Saves the complete percentage of the course
* date - document creation date

## Contributing:
The main purpose of this repository is to help people who want to study web apps development. Feel free to modify as you want or to help with bugfixes and improvements.