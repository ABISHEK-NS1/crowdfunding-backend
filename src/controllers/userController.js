import mongoose from 'mongoose';

import { FundraiserDonations } from '../models/fundraiserDonations.js';
import Fundraiser from '../models/fundraiserModel.js';

const saveDonation = async (req, res) => {
    const {
        fundraiserId,
        paymentId,
        amount,
        anonymous,
        uid,
        fullname,
    } = req.body;

    if (mongoose.isValidObjectId(fundraiserId)) {
        const donation = await FundraiserDonations.create({
            uid,
            fullname,
            fundraiserId,
            paymentId,
            donationAmount: amount,
            anonymousDonation: anonymous,
        });
        const fundraiser =
            await Fundraiser.findById(fundraiserId);

        if (fundraiser) {
            fundraiser.amountRaised += amount;
            await fundraiser.save();
        }

        if (donation) {
            return res.json({
                statusCode: 200,
                message: 'Donation saved successfully',
                donation,
            });
        } else {
            return res.json({
                statusCode: 400,
                message: 'Failed to save donation',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'Invalid fundraiser Id',
        });
    }
};

export { saveDonation };
