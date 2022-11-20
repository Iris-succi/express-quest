require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5004;
app.use(express.json()); 

const welcome = (req, res) => {
  res.send("Welcome to hell");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const {validateMovie}   = require("./validators.js");
const {validateUser}   = require("./validators.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, usersHandlers.postUser);

app.put("/api/users/:id", validateUser, usersHandlers.updateUsers);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


