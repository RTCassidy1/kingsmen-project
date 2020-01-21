const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    year: {
        type: String
    },
    runtime: {
        type: Number
    },
    genre: {
        type: String
    }
})

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;