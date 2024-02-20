import mongoose from 'mongoose';

const FundraiserDonationsSchema = new mongoose.Schema(
    {
        uid: String,
        fundraiserId: String,
        transactionId: String,
        donationAmount: Number,
        anonymousDonation: Boolean,
    },
    {
        timestamps: true,
    }
);

export const FundraiserDonations = mongoose.model(
    'FundraiserDonations',
    FundraiserDonationsSchema
);
