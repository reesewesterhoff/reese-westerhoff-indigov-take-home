# reese-westerhoff-indigov-take-home
A simple example of a back end for a constituent management application

### To Run:
1. Git clone the project to your local environment
2. Spin up a local mongodb with Docker using the command ```docker run --name mongodb -p 27017:27017 -d mongo```
3. Open the cloned project from the command line and ```cd``` into _/reese-westerhoff-indigov-take-home/backend/services/constituent-service_ and run ```npm install```
4. Run ```npm run dev``` to start the server
5. Use Postman or curl to query the following endpoints:
   - POST /api/constituents _(Creates/updates constituents based on email address. Available fields(all strings): email, firstName, lastName, address: { street, city, state, postalCode, country })_
   - GET /api/constituents _(Gets all constituents in database)_
   - GET /api/constituents/export _(Exports all constituents in database to CSV)_
  
### Notes:
- This is as far as I got in 90 mins, there is clean up and additional configurability/functionality that I would add given more time
- Fun little project! Let me know if you have any questions or issues running the app. Thanks!
