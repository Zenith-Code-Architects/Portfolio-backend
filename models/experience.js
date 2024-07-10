import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const experienceSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String },
    role: { type: String },
    skills: { type: String },
    description: { type: String },
    employmentType: { type: String, enum: ['full-time', 'part-time', 'self-employed', 'freelance', 'contract', 'internship'] },
    location: { type: String },
    locationType: { type: String, enum: ['on-site', 'hybrid', 'remote'] },
    startDate: { type: String },
    endDate: { type: String }
}, {
    timestamps: true
})

experienceSchema.plugin(toJSON)

export const ExperienceModel = model('Experience', experienceSchema)
