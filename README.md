# simple-express-form
A simple node.js demo using Express & MongoDB

## Execution
After cloning this repository, run the following commands:
```
npm install --production
npm run simple-express-form
```
then navigate to http://127.0.0.1:3000

simple-express-form expects to connect to mongoDB locally, to change this, adjust the following line in /config/production.json:
```javascript
"host": "mongodb://localhost:27017/nodetest"
```
*/nodetest* is the name of the target mongoDB database.

## Architecture
simple-express-form uses Express for middleware and Embedded Javascript (& HTML5) for the views. For an application this simple there's no need to implement a template based view engine.
Persistence is handled by mongoDB. Normally when writing data to a DB, we would write a callback in the request to wait for a success message from mongo. But, in this case we only need to show data which is currently held in memory, so this application allows mongo saving to happen asynchronously, without making the end user wait.

## Validation
This simple application uses HTML5 & browser validation to ensure form fields are completed correctly. Without knowing specifics about a target audience for this application, this is the quickest, easiest and most syntactical method to add reliable form validation. All specified field types are required and of their expected types. Modern browsers will handle verification error messages in the users native language, and it's client javascript agnostic, so will work regardless.

## Tests
Navigate to http://127.0.0.1:3000/tests
This will execute all the tests, and display the results to the screen, each test can be expanded to show more details. The tests are executed using Mocha, a simple async testing framework, in this instance I'm leveraging Chai, which allows tests to be written using simple language. It doesn't add too much overhead to the development process, and provides reliable results. It's designed for BDD, but can be used for simple, direct unit tests too, making integration with Jenkins (or similar) very easy.
