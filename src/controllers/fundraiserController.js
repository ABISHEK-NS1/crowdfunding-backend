import Fundraiser from "../models/fundraiserModel.js";

const getDraftFundraiser = async (req, res) => {
  const { uid } = req.body;

  const fundraiser = await Fundraiser.findOne({
    uid,
    status: { $in: ["draft", "review"] },
  });

  if (fundraiser) {
    return res.json({ statusCode: 200, message: "Draft fundraiser found!", fundraiser });
  } else {
    return res.json({ statusCode: 404, message: "No draft fundraiser!" });
  }
};

const saveFundraiser = async (req, res) => {
  const { uid, fundraiserTitle, fundraiserStory, fundraiserFor, beneficiaryName, fundraiserCause, fundraiserGoal, coverMediaUrl, status } = req.body;

  const fundraiser = await Fundraiser.findOne({
    uid,
    status: { $in: ["draft", "review"] },
  });
  const fundraiserId = fundraiser?._id;

  if (!fundraiserId) {
    const fundraiser = await Fundraiser.create({
      uid,
      fundraiserTitle,
      fundraiserStory,
      fundraiserFor,
      beneficiaryName,
      fundraiserCause,
      fundraiserGoal,
      coverMediaUrl,
      status,
    });
    return res.json({ statusCode: 200, message: "Fundraiser saved!", fundraiser });
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
    return res.json({ statusCode: 200, message: "Fundraiser updated!", fundraiser });
  }
};

export { saveFundraiser, getDraftFundraiser };
