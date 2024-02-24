import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { baseurl } from './lib.js';

import 'dotenv/config';

export const sendVerificationMail = (sendTo, uid) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.OFFICIAL_MAIL,
            pass: process.env.OFFICIAL_MAIL_PASSWORD,
        },
    });

    const token = jwt.sign(
        {
            data: { email: sendTo, uid: uid },
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '5m' }
    );

    const mailConfigurations = {
        from: process.env.OFFICIAL_MAIL,
        to: sendTo,
        subject: 'Email Verification',
        text: `Hi! There, You have recently created an account or asked for verification mail on our website.\n\nPlease follow the given link to verify your email\n\n${baseurl}/user/verify/${token}\n\nThe link will expire in 5 minutes\n\nThank You!`,
    };

    transporter.sendMail(
        mailConfigurations,
        function (error, info) {
            if (error) return Error(error);
            return info;
        }
    );
};
