import mongoose from "mongoose";

const FoundraiserSchema = new mongoose.Schema(
  {
    uid: String,
    fundraiserTitle: String,
    fundraiserStory: String,
    fundraiserFor: String,
    beneficiaryName: {
      type: String,
      default: null,
    },
    fundraiserCause: String,
    fundraiserGoal: Number,
    amountRaised: Number,
    coverMediaUrl: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Fundraiser = mongoose.model("Fundraiser", FoundraiserSchema);
