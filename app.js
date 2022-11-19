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

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", usersHandlers.postUser);
app.put("/api/users/:id", usersHandlers.updateUsers);
app.put("/api/movies/:id", movieHandlers.updateMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


