import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const skillsSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    levelOfProfiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] }
}, {
    timestamps: true
})

skillsSchema.plugin(toJSON)

export const SkillsModel = model('Skill', skillsSchema)
