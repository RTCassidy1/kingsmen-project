const express = require("express");
const app = express();
const {connectDb,dropMovieCollection} = require("./src/connection");
const User = require("./src/User.model");
const Movie = require("./src/Movie.model");
const cors = require("cors");



const PORT = 8080;



app.use(cors());

app.get("/load-movies", async (req,res) => {
    console.log("loading movies...")
        for(var i = 0; i < 10000; i++){
            const movie = new Movie({
                title: "title" + i,
                year: "199" + i%10,
                runtime: i,
                genre: "comedy"
            });
            await movie.save().then(() => console.log("movie " + i +" added"))
        }
    res.send("Reloaded Movies");
});

app.get("/movies", async (req,res) => {
    const movies = await Movie.find();
    console.log("fetching movies");
    res.json(movies);
});

app.get("/users", async (req,res) => {
    const users = await User.find();
    console.log("fetching users");
    res.json(users);
});

app.get("/user-create", async (req,res) => {
    const user = new User({username: "testuser"});

    await user.save().then(() => console.log("User created"));

    res.send("User created \n");
})

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`);

    connectDb().then(() => {
        console.log("MongoDb connected");
    })
})