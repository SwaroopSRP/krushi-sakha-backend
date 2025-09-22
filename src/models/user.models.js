import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        surname: { type: String, required: true, trim: true },
        location: { type: String, trim: True }, // e.g., city or district
        area: { type: Number }, // more specific area
        summary: { type: String, default: "" }, // running LLM summary
        history: { type: String, default: "" }, // array of text entries (questions/answers)
        isPhoneVerified: { type: Boolean, default: false }
    },
    {
        timestamps: true // adds createdAt and updatedAt
    }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
