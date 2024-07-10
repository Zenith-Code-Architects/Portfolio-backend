import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const volunteeringSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    organization: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String },
    skills: { type: String },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    projectName: { type: String }
}, {
    timestamps: true
})

volunteeringSchema.plugin(toJSON)

export const VolunteeringModel = model('Volunteering', volunteeringSchema)