import { model, Schema } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    sex: {type: String, enum: ['Male', 'Female', 'Prefer not to say']},
    password: {type: String, required: true},
    consent: {type: Boolean, required: true}
})

userSchema.plugin(toJSON)

export const UserModel = model('user', userSchema)
