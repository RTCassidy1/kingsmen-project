const mongoose = require("mongoose");
const User = require("./User.model");

const connection = "mongodb://localhost:27017/mongo-test";

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