const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    roles: {
        type: [{
            type: String,
            enum: ['USER', 'ADMIN'],
        }, ],
        default: ['USER'],
    },
}, { timestamps: true }, { versionKey: false });

UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.pre('remove', async function(next) {
    const user = this;
    user.model('Message').deleteMany({ user: this._id });
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;