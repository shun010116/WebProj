const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// 비밀번호 암호화
// userSchema.pre('save', async (next) => {
//     if(this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

module.exports = mongoose.model('User', userSchema);