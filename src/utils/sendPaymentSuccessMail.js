import nodemailer from 'nodemailer';

import 'dotenv/config';

export const sendPaymentSuccessMail = (
    sendTo,
    fullname,
    paymentId,
    fundraiserId,
    amount
) => {
    const transporter = nodemailer.createTransport({
        host: 'mail.mail.ee',
        port: 465,
        secure: true,
        auth: {
            user: process.env.OFFICIAL_MAIL,
            pass: process.env.OFFICIAL_MAIL_PASSWORD,
        },
    });

    const mailConfigurations = {
        from: process.env.OFFICIAL_MAIL,
        to: sendTo,
        subject: 'Donation Successful',
        text: `Hello ${fullname}, Thank you for your generous donation\n\nAmount: ₹${amount}\nFundraiser: https://sahyogweb.vercel.app/fundraiser/${fundraiserId}\nPayment ID: ${paymentId}.\n\nThis is a payment confirmation mail for your donation. Do not reply.`,
    };

    transporter.sendMail(
        mailConfigurations,
        function (error, info) {
            if (error) {
                console.log(error);
            }
        }
    );
};
