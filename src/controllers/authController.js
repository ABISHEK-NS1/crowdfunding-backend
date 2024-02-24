import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import { sendVerificationMail } from '../utils/tokenSender.js';

import 'dotenv/config';

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
        sendVerificationMail(email, uid);
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

const resendVerificationMail = async (req, res) => {
    const { email, uid } = req.body;
    sendVerificationMail(email, uid);
    return res.json({
        statusCode: 200,
        message: 'Verification mail sent!',
    });
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        async function (err, decoded) {
            if (err) {
                return res.send(
                    'Email verification failed, possibly the link is invalid or expired'
                );
            } else {
                const { email, uid } = decoded.data;

                const user = await User.findOne({
                    uid,
                    email,
                });
                if (user) {
                    if (user.emailVerified) {
                        return res.send(
                            'Email already verified'
                        );
                    } else {
                        user.emailVerified = true;
                        await user.save();
                        return res.send(
                            'Email verified successfully'
                        );
                    }
                } else {
                    return res.send('No user found');
                }
            }
        }
    );
};

export {
    checkForName,
    resendVerificationMail,
    signIn,
    signUp,
    verifyEmail,
};
