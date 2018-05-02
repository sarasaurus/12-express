# Express and MongoDB
**Author**: Sarah Bixler
**Version**: 1.2.0 (increment the patch/fix version number up if you make more commits past your first submission)
## Overview
This is a storage app that uses mongoDB and express.js to save items, with 3 properties to a database.
## Getting Started
__This app is currently in development__
once complete:
1. fork this repo, npm i to download dependancies
2. start index.js using nodemon to run the server
3. start the database by typing npm run dbon
4. then use httpie in the CLI to type api requests
http POST localhost:3000/api/v1/trees/ type= genus= height=
http GET localhost:3000/api/v1/trees/ type== genus== height==
__TO RUN AS IS__
complete step 1
then:
1. npm run dbon
2. in seperate CLI tab: npm run test

## Architecture
This app uses the ES6 and the node.js framework, babel is the transpiler, express.js for routing, mondgoDB for our database... Jest is the testing suite.
## Change Log
5-1-2018 -- testing suite is passing POST, GET, GET ALL and DELETE routes
5-2-2018 -- POST, GET, GET ALL, PUT and DELETE all fully functional -- tests passing
