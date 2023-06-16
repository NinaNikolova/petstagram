const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name have to be at less 2 characters long']
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: {
           regex: /^https?:\/\//,
           message: 'Invalid url'
        },
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min:1,
        max:100
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description must be at less 5 character long'],
        maxLength:  [50, 'Description must be no more than 50 character long'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location must be at less 5 character long'],
        maxLength:  [50, 'Location must be no more than 50 character long'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref:"User"
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