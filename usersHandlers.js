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

  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;

    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
};

const updateUsers = (req, res) => {
  const {firstname, lastname, email, city, language } = req.body;

  database.query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
  [firstname, lastname, email, city, language])
  .then(([result]) => {
    res.location(`api/users/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
        res.status(500).send("Error saving the user");
  })
}

  module.exports = {
    getUsers,
    getUsersById,
    postUser,
    updateUsers,
  };