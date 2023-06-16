const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Username is required!'],
        unique: true,

    },
    email: {
        type: String,
        required: [true,'Email is required!'],
    },
    password: {
        type: String,
        required: [true,'Password is required!'],
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



