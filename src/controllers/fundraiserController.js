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
        coverMediaUrl,
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
            coverMediaUrl,
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
                coverMediaUrl,
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

export {
    deleteFundraiserDraft,
    getAllFundraisers,
    getDraftFundraiser,
    getUserFundraisers,
    saveFundraiser,
};
