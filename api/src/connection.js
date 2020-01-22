const mongoose = require("mongoose");
const Movie = require("./Movie.model");

const connection = "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
    return mongoose.connect(connection, { 
        useUnifiedTopology: true,
        useNewUrlParser: true })
        .catch(err => {
        console.log(`DB Connection Error: ${err.message}`)});
};

const dropMovieCollection = () => {
    return mongoose.connection.db.dropCollection('Movie', function(err, result) {
        if(err)
            console.warn(err);
        else
            console.log(result);
    })
}

module.exports = {connectDb,dropMovieCollection};