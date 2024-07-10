import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const achievementSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    awards: { type: String },
    description: { type: String },
    image: { type: String },
    date: { type: String },
    nameOfInstitution: { type: String }
}, {
    timestamps: true
})

achievementSchema.plugin(toJSON)

export const AchievementModel = model('Achievement', achievementSchema)
