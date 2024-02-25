import { FundraiserDonations } from '../models/fundraiserDonationsModal.js';
import Fundraiser from '../models/fundraiserModel.js';
import User from '../models/userModel.js';

const updateUserEmail = async (req, res) => {
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
                    email: user.email,
                    emailVerified: user.emailVerified,
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

const updateUserFullName = async (req, res) => {
    const { uid, fullname } = req.body;

    const user = await User.findOne({ uid });

    if (user) {
        await Fundraiser.updateMany(
            { uid },
            { creatorName: fullname }
        );
        await FundraiserDonations.updateMany(
            { uid },
            { fullname }
        );
        user.fullname = fullname;
        const updated = await user.save();

        if (updated) {
            return res.json({
                statusCode: 200,
                message: 'User fullname updated!',
            });
        } else {
            return res.json({
                statusCode: 400,
                message: 'Problem updating fullname',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'User not found!',
        });
    }
};

export { updateUserEmail, updateUserFullName };
