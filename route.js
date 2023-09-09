const express = require("express");
const router = express.Router();

const Promise = require('bluebird') 
const AppDAO = require('./dao') 
const Users = require('./user')

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.send("Это только мой мир.");
});

// router.get("/user/id", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   res.send(req.params)
// });

router.get("/register/:name/:password/:native/:interestng", (req, res) => {
  const dao = new AppDAO('./database.sqlite3') 
  const users = new Users(dao) 

  let userId

  users.createTable()
    .then(() => users.create(req.params)) 
    .then((data) => { 
      userId = data.id 
      const tasks = [ 
      { 
        name: 'Outline', 
        password: 'High level overview of sections', 
        native: 1, 
        interestng: 'it',
        userId 
      }, 
      { 
        name: '123', 
        password: 'High level overview of sections', 
        native: 0, 
        interestng: 'it',
        userId 
      } 
      ] 
      return Promise.all(tasks.map((task) => { 
      const { name, password, native, interestng, userId } = task 
      return taskRepo.create( name, password, native, interestng, userId ) 
      })) 
      }) 


  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.send(req.params)
});

module.exports = router;
