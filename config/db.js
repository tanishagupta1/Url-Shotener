const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        await mongoose.connect(db,{
         UseNewUrlParser : true
        });

        console.log('MongoDb connected...')
    } catch (err) {
        console.error(err.meessage);
        process.exit(1);
    }
}

module.exports = connectDB;
