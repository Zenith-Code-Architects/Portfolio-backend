import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const achievementSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    awards: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    date: { type: String, required: true },
    nameOfInstitution: { type: String, required: true }
}, {
    timestamps: true
})

achievementSchema.plugin(toJSON)

export const AchievementModel = model('Achievement', achievementSchema)
