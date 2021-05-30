const mongoose = require("mongoose")

async function connectDB() {
    try {
        const url = "mongodb://server.lavelektronik.com:27017/saraBPProjekat"
        

        const connection = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Connected to database")
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

module.exports = connectDB