const mongoose = require('mongoose')
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`momgodb connected to ${mongoose.connection.host} `);
    } catch (error) {
        console.log(`error is occured in ${error}`)
    }
}
module.exports = connectToDb