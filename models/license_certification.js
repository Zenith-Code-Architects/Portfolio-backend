import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const licenseSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    issuingOrganization: { type: String },
    issueDate: { type: String },
    expirationDate: { type: String },
    credentialId: { type: String },
    credentialUrl: { type: String },
    skills: { type: String },
    media: { type: String },
}, {
    timestamps: true
})

licenseSchema.plugin(toJSON)

export const LicenseModel = model('License', licenseSchema)