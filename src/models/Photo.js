const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            text: {
                type: String,
                required: [true, 'Comment message is required']
            }
        }
    ]
})

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;