const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Username is required!'],
        unique: true,
        minLength: [2, 'Username must be at less 2 character long'],

    },
    email: {
        type: String,
        required: [true,'Email is required!'],
        minLength: [10, 'Email must be at less 10 character long'],
    },
    password: {
        type: String,
        required: [true,'Password is required!'],
        minLength: [4, 'Password must be at less 4 character long'],
    }
   
})
userSchema.virtual('repass')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Passwords missmatch!')
        }
    })
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;



