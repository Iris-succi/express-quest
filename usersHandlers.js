const database = require("./database")
const { query } = require("./database")


const getUsers = (req, res) => {
    const id = parseInt(req.params.id);
    database
    .query(`select * from users`, [id])
    .then(([users]) => {
        res.json(users)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send("Error retrieving data from database");
    });
  }  
  

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    database
    .query(`select * from users where id= ?`, [id])
    .then(([users]) => {
        if (users[0] != null) {
            res.json(users[0]);
          } else {
            res.status(404).send("Not Found");
          }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send("Error retrieving data from database");
    });
  }  

  

  module.exports = {
    getUsers,
    getUsersById,
  };