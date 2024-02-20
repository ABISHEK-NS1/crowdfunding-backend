import User from '../models/userModel.js';

const signIn = async (req, res) => {
    const { uid, email } = req.body;
    const user = await User.findOne({
        uid,
        email,
    });

    if (user) {
        return res.json({
            statusCode: 200,
            message: 'User logged in!',
            userDetails: {
                fullname: user.fullname,
                emailVerified: user.emailVerified,
                profilePicUrl: user.profilePicUrl,
            },
        });
    } else {
        return res.json({
            statusCode: 400,
            message: 'User not found!',
        });
    }
};

const signUp = async (req, res) => {
    const { uid, fullname, email } = req.body;

    const user = await User.create({
        uid,
        fullname,
        email,
    });

    if (user) {
        return res.json({
            statusCode: 200,
            message: 'User created!',
            userDetails: {
                emailVerified: false,
                profilePicUrl: user.profilePicUrl,
            },
        });
    } else {
        return res.json({
            statusCode: 400,
            message: 'User not created!',
        });
    }
};

const checkForName = async (req, res) => {
    const { fullname } = req.body;

    const user = await User.find({
        fullname,
    });

    if (user.length > 0) {
        return res.json({
            statusCode: 200,
            message: 'User found!',
        });
    } else {
        return res.json({
            statusCode: 404,
            message: 'User not found!',
        });
    }
};
export { checkForName, signIn, signUp };
