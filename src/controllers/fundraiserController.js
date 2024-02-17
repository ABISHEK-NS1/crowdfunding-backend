import Fundraiser from "../models/fundraiserModel.js";

const saveFundraiser = async (req, res) => {
  const { uid, fundraiserId, fundraiserTitle, fundraiserStory, fundraiserFor, beneficiaryName, fundraiserCause, fundraiserGoal, coverMediaUrl } = req.body;

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
      status: "draft",
    });
    return res.json({ statusCode: 200, message: "Fundraiser saved!", fundraiser });
  } else {
    const fundraiser = await Fundraiser.findOneAndUpdate(
      { uid, _id: fundraiserId },
      {
        fundraiserTitle,
        fundraiserStory,
        fundraiserFor,
        beneficiaryName,
        fundraiserCause,
        fundraiserGoal,
        coverMediaUrl,
      }
    );
    return res.json({ statusCode: 200, message: "Fundraiser saved!", fundraiser });
  }
};

export { saveFundraiser };
