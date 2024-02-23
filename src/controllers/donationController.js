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

        if (fundraiser.status !== 'active') {
            return res.json({
                statusCode: 400,
                message: 'Fundraiser is not active',
            });
        }

        if (fundraiser) {
            fundraiser.amountRaised += Number(amount);
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

const getFundraiserDonationsById = async (req, res) => {
    const { fundraiserId } = req.body;

    if (mongoose.isValidObjectId(fundraiserId)) {
        const donations = await FundraiserDonations.find({
            fundraiserId,
        }).select(['-paymentId']);

        if (donations) {
            return res.json({
                statusCode: 200,
                message: 'Donations fetched successfully',
                donations,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: 'No donations found',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'Invalid fundraiser id!',
        });
    }
};

const getUserDonationsById = async (req, res) => {
    const { uid } = req.body;

    const donations = await FundraiserDonations.find({
        uid,
    });
    const fundraisers = await Fundraiser.find({
        _id: {
            $in: donations.map(
                (donation) => donation.fundraiserId
            ),
        },
    });

    if (donations) {
        const composedDonations = donations.map((donation) => ({
            ...donation._doc,
            fundraiserTitle: fundraisers
                .filter(
                    (fundraiser) =>
                        donation.fundraiserId ===
                        fundraiser._id.toString()
                )
                .map((fundraiser) =>
                    fundraiser.status === 'deleted'
                        ? `${fundraiser._id.toString()} (Not active)`
                        : fundraiser.fundraiserTitle
                )[0],
        }));

        return res.json({
            statusCode: 200,
            message: 'Donations fetched successfully',
            donations: composedDonations,
        });
    } else {
        return res.json({
            statusCode: 404,
            message: 'No donations found',
        });
    }
};

export {
    getFundraiserDonationsById,
    getUserDonationsById,
    saveDonation,
};
