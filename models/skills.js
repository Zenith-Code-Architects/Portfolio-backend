import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const skillsSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    levelOfProfiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] }
}, {
    timestamps: true
})
// Ensure unique skillName per user
skillsSchema.index({ user: 1, name: 1 }, { unique: true });

skillsSchema.plugin(toJSON)

export const SkillsModel = model('Skill', skillsSchema)
