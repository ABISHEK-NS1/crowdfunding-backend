import mongoose from 'mongoose';

import Fundraiser from '../models/fundraiserModel.js';

const getDraftFundraiser = async (req, res) => {
    const { uid } = req.body;

    const fundraiser = await Fundraiser.findOne({
        uid,
        status: { $in: ['draft', 'review'] },
    });

    if (fundraiser) {
        return res.json({
            statusCode: 200,
            message: 'Draft fundraiser found!',
            fundraiser,
        });
    } else {
        return res.json({
            statusCode: 404,
            message: 'No draft fundraiser!',
        });
    }
};

const saveFundraiser = async (req, res) => {
    const {
        uid,
        creatorName,
        profilePicUrl,
        fundraiserTitle,
        fundraiserStory,
        fundraiserFor,
        beneficiaryName,
        fundraiserCause,
        fundraiserGoal,
        fundraiserCity,
        fundraiserState,
        coverMediaUrl,
        zipCode,
        status,
    } = req.body;

    const fundraiser = await Fundraiser.findOne({
        uid,
        status: { $in: ['draft', 'review'] },
    });
    const fundraiserId = fundraiser?._id;

    if (!fundraiserId) {
        const fundraiser = await Fundraiser.create({
            uid,
            creatorName,
            profilePicUrl,
            fundraiserTitle,
            fundraiserStory,
            fundraiserFor,
            beneficiaryName,
            fundraiserCause,
            fundraiserGoal,
            fundraiserCity,
            fundraiserState,
            coverMediaUrl,
            zipCode,
            status,
        });
        return res.json({
            statusCode: 200,
            message: 'Fundraiser saved!',
            fundraiser,
        });
    } else {
        const fundraiser = await Fundraiser.findByIdAndUpdate(
            fundraiserId,
            {
                fundraiserTitle,
                fundraiserStory,
                fundraiserFor,
                beneficiaryName,
                fundraiserCause,
                fundraiserGoal,
                fundraiserCity,
                fundraiserState,
                coverMediaUrl,
                zipCode,
                status,
            },
            { new: true }
        );
        return res.json({
            statusCode: 200,
            message: 'Fundraiser updated!',
            fundraiser,
        });
    }
};

const updateFundraiser = async (req, res) => {
    const {
        uid,
        fundraiserId,
        fundraiserTitle,
        fundraiserStory,
        fundraiserCause,
        fundraiserGoal,
        fundraiserCity,
        fundraiserState,
        coverMediaUrl,
        zipCode,
    } = req.body;

    const findFundraiser =
        await Fundraiser.findById(fundraiserId);

    if (findFundraiser) {
        if (findFundraiser.uid === uid) {
            const fundraiser =
                await Fundraiser.findByIdAndUpdate(
                    fundraiserId,
                    {
                        fundraiserTitle,
                        fundraiserStory,
                        fundraiserCause,
                        fundraiserGoal,
                        fundraiserCity,
                        fundraiserState,
                        coverMediaUrl,
                        zipCode,
                    },
                    { new: true }
                );
            return res.json({
                statusCode: 200,
                message: 'Fundraiser updated!',
                fundraiser,
            });
        } else {
            return res.json({
                statusCode: 400,
                message: 'Forbidden access!',
            });
        }
    } else {
        return res.json({
            statusCode: 404,
            message: 'Fundraiser not found!',
        });
    }
};

const deleteFundraiserDraft = async (req, res) => {
    const { uid, fundraiserId } = req.body;

    const fundraiser = await Fundraiser.findByIdAndDelete({
        uid,
        _id: fundraiserId,
    });

    if (fundraiser) {
        return res.json({
            statusCode: 200,
            message: 'Draft fundraiser deleted!',
        });
    } else {
        return res.json({
            statusCode: 404,
            message: 'No draft fundraiser found!',
        });
    }
};

const getAllFundraisers = async (req, res) => {
    const allFundraisers = await Fundraiser.find(
        {
            status: 'active',
        },
        null,
        { sort: { createdAt: -1 } }
    );
    if (allFundraisers) {
        return res.json({
            statusCode: 200,
            message: 'All fundraisers found!',
            allFundraisers,
        });
    } else {
        return res.json({
            statusCode: 404,
            message: 'No fundraisers found!',
        });
    }
};

const getUserFundraisers = async (req, res) => {
    const { uid } = req.body;

    const userFundraisers = await Fundraiser.find(
        {
            uid,
        },
        null,
        { sort: { createdAt: -1 } }
    );

    if (userFundraisers) {
        return res.json({
            statusCode: 200,
            message: 'User fundraisers found!',
            userFundraisers,
        });
    } else {
        return res.json({
            statusCode: 404,
            message: 'No fundraisers found!',
        });
    }
};

const getFundraiserById = async (req, res) => {
    const { fundraiserId } = req.body;

    if (mongoose.isValidObjectId(fundraiserId)) {
        const fundraiserDetails =
            await Fundraiser.findById(fundraiserId);

        if (fundraiserDetails) {
            return res.json({
                statusCode: 200,
                message: 'Fundraiser found!',
                fundraiserDetails,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: 'Fundraiser not found!',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'Invalid fundraiser id!',
        });
    }
};

const getUserFundraiserById = async (req, res) => {
    const { fundraiserId, uid } = req.body;

    if (mongoose.isValidObjectId(fundraiserId)) {
        const fundraiserDetails =
            await Fundraiser.findById(fundraiserId);

        if (fundraiserDetails.uid === uid) {
            if (fundraiserDetails) {
                return res.json({
                    statusCode: 200,
                    message: 'Fundraiser found!',
                    fundraiserDetails,
                });
            } else {
                return res.json({
                    statusCode: 404,
                    message: 'Fundraiser not found!',
                });
            }
        } else {
            return res.json({
                statusCode: 400,
                message: 'Forbidden access!',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'Invalid fundraiser id!',
        });
    }
};

const deleteFundraiser = async (req, res) => {
    const { fundraiserId, uid } = req.body;

    if (mongoose.isValidObjectId(fundraiserId)) {
        const fundraiser =
            await Fundraiser.findById(fundraiserId);
        if (fundraiser) {
            if (fundraiser.uid === uid) {
                const fundraiserDelete =
                    await Fundraiser.findByIdAndUpdate(
                        fundraiserId,
                        {
                            fundraiserTitle: '',
                            fundraiserStory: '',
                            fundraiserFor: '',
                            beneficiaryName: '',
                            creatorName: '',
                            profilePicUrl: '',
                            fundraiserCause: '',
                            amountRaised: null,
                            fundraiserGoal: null,
                            fundraiserCity: '',
                            fundraiserState: '',
                            coverMediaUrl: '',
                            zipCode: null,
                            status: 'deleted',
                        },
                        { new: true }
                    );
                if (fundraiserDelete) {
                    return res.json({
                        statusCode: 200,
                        message: 'Fundraiser deleted!',
                    });
                }
            } else {
                return res.json({
                    statusCode: 400,
                    message: 'Forbidden access!',
                });
            }
        } else {
            return res.json({
                statusCode: 404,
                message: 'Fundraiser not found!',
            });
        }
    } else {
        return res.json({
            statusCode: 400,
            message: 'Invalid fundraiser id!',
        });
    }
};

export {
    deleteFundraiser,
    deleteFundraiserDraft,
    getAllFundraisers,
    getDraftFundraiser,
    getFundraiserById,
    getUserFundraiserById,
    getUserFundraisers,
    saveFundraiser,
    updateFundraiser,
};
