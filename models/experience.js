import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const experienceSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    skills: { type: String },
    description: { type: String },
    employmentType: { type: String, enum: ['full-time', 'part-time', 'self-employed', 'freelance', 'contract', 'internship'] },
    location: { type: String },
    locationType: { type: String, enum: ['on-site', 'hybrid', 'remote'] },
    startDate: { type: String, required: true },
    endDate: { type: String }
}, {
    timestamps: true
})

experienceSchema.plugin(toJSON)

export const ExperienceModel = model('Experience', experienceSchema)
