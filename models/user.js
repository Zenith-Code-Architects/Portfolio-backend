import { model, Schema } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String},
    email: {type: String},
    password: {type: String},
    consent: {type: Boolean}
})

userSchema.plugin(toJSON)

export const UserModel = model('user', userSchema)
