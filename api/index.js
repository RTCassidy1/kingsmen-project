const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const {connectDb,dropMovieCollection} = require("./src/connection");
const User = require("./src/User.model");
const Movie = require("./src/Movie.model");
const cors = require("cors");
const url = require("url");


const PORT = 8080;
const batchsize = 500;



app.use(cors());
app.use(bodyParser.json());

app.get("/seed-table", async (req,res) => {
    console.log("loading movies...")
        for(var i = 0; i < 10000; i++){
            var y = Math.floor((Math.random() * 4));
            const movie = new Movie({
                title: "title" + i,
                year: 1900 + Math.floor((Math.random() * 100)),
                runtime: Math.floor((Math.random() * 210) + 30),
                genre: (y === 3 ? 'action' : y === 2 ? 'comedy' : y === 1 ? 'drama' : 'romance')
            });
            await movie.save().then(() => console.log("movie " + i +" added"))
        }
    res.send("Reloaded Movies");
});

app.post("/movies", async (req,res) => {
    var queryData = req.body;
    console.log("POST: /movies " + JSON.stringify(queryData));
    var offset = 0;
    var sort = (queryData.sort ? queryData.sort : {})
    if(queryData.page)
        offset = batchsize * queryData.page
    const movies = await Movie.find(null,null,{skip: offset, limit: batchsize}).sort(sort);
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