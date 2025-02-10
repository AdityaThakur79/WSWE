const mongoose = require('mongoose');
const workshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    keyword: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizerName: {
        type: String,
        required: [true, 'organizer name is required']
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    date: {
        type: String,
        required: [true, 'date is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    approved: {
        type: Number,
        default: 0
    },
    participantsNumber: {
        type: Number,
        required: [true, "participants number is required"]
    },
    UsersRegistered: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    registered: {
        type: Number,
        default: 0
    }

}, { timestamps: true })
const Workshop = mongoose.model('Workshop', workshopSchema);
module.exports = Workshop;