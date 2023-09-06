const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook';

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDb/iNoteBookDb Successfully");
}
module.exports = connectToMongo;