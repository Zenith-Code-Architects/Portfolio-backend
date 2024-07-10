import { model, Schema } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    consent: { type: Boolean }
}, {
    timestamps: true
})

userSchema.plugin(toJSON)

export const UserModel = model('User', userSchema)
