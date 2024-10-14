import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema(
    {
        uid: String,
        fullname: { type: String, minLength: 3 },
        email: String,
        emailVerified: { type: Boolean, default: false },
        profilePicUrl: {
            type: String,
            default: 'https://abcd.in/broken-link',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('users', UserSchema);

export default User;
