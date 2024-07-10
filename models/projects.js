import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const projectSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String },
    program: { type: String },
    contributors: { type: String },
    skills: { type: String },
    link: { type: String },
    nameOfInstitution: { type: String },
    startDate: { type: String },
    endDate: { type: String }
}, {
    timestamps: true
})

projectSchema.plugin(toJSON)

export const ProjectModel = model('Project', projectSchema)
