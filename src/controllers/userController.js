import User from '../models/userModel.js';

const changeUserEmail = async (req, res) => {
    const { uid, email } = req.body;

    const user = await User.findOne({ uid });

    if (user) {
        user.email = email;
        user.emailVerified = false;
        const saved = await user.save();

        if (saved) {
            return res.json({
                statusCode: 200,
                message: 'User email updated!',
                userDetails: {
                    fullname: user.fullname,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    profilePicUrl: user.profilePicUrl,
                },
            });
        } else {
            return res.json({
                statusCode: 400,
                message: 'User email not updated!',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'User not found!',
        });
    }
};

export { changeUserEmail };
