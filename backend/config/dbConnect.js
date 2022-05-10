const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Connected to the MongoDB server');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB
